import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassService } from 'src/class/class.service';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto';
import { FeedCreateDto, FeedDto, FeedInfoDto } from './dto';
import { FeedService } from './feed.service';

@Controller()
@ApiTags('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly classService: ClassService,
  ) {}

  /** CREATE */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: FeedCreateDto })
  @ApiOkResponse({ type: FeedInfoDto })
  async create(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') classId: string,
    @Body() feedCreateDto: FeedCreateDto,
  ): Promise<FeedInfoDto> {
    // create feed
    feedCreateDto.classId = new Types.ObjectId(classId);
    feedCreateDto.question.user = new Types.ObjectId(userDto._id);
    const feed = await this.feedService.create(feedCreateDto);
    // add feed to class
    this.classService.addFeed(feedCreateDto.classId, feed._id);

    return await this.feedService.feedMapper(feed);
  }

  /** READ */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FeedInfoDto, isArray: true })
  async listAll(@Query('classId') classId: string): Promise<FeedInfoDto[]> {
    const feeds = await this.feedService.listAll(new Types.ObjectId(classId));

    return await this.feedService.feedsMapper(feeds);
  }
}
