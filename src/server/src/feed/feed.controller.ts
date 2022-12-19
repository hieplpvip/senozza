import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassService } from 'src/class/class.service';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto';
import { FeedCreateDto, FeedDto } from './dto';
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
  @ApiOkResponse({ type: FeedDto })
  async create(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') classId: string,
    @Body() feedCreateDto: FeedCreateDto,
  ): Promise<FeedDto> {
    // create feed
    feedCreateDto.question.user = new Types.ObjectId(userDto._id);
    const feed = await this.feedService.create(feedCreateDto);
    // add feed to class
    this.classService.addFeed(new Types.ObjectId(classId), feed._id);

    return await this.feedService.feedMapper(feed);
  }

  /** READ */
}
