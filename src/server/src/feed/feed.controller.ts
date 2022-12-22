import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassService } from 'src/class/class.service';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto';
import { FeedCreateDto, FeedDto, FeedUpdateDto } from './dto';
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
  @ApiOkResponse({ type: FeedDto, isArray: true })
  async listAll(@Query('classId') classId: string): Promise<FeedDto[]> {
    const feeds = await this.feedService.listAll(new Types.ObjectId(classId));

    return await this.feedService.feedsMapper(feeds);
  }

  @Get('pin')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FeedDto, isArray: true })
  async listPin(@Query('classId') classId: string): Promise<FeedDto[]> {
    const feeds = await this.feedService.listPin(new Types.ObjectId(classId));

    return await this.feedService.feedsMapper(feeds);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FeedDto, isArray: true })
  async listFilter(
    @Query('classId') classId: string,
    @Query('category') category: string,
  ): Promise<FeedDto[]> {
    const feeds = await this.feedService.filterCategory(
      new Types.ObjectId(classId),
      category,
    );

    return await this.feedService.feedsMapper(feeds);
  }

  /** UPDATE */
  @Put('edit')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: FeedUpdateDto })
  async edit(
    @ExtractedUser() userDto: UserDto,
    @Query('feedId') feedId: string,
    @Body() feedUpdateDto: FeedUpdateDto,
  ) {
    await this.feedService.edit(new Types.ObjectId(feedId), feedUpdateDto);
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Query('feedId') feedId: string) {
    await this.feedService.delete(new Types.ObjectId(feedId));
  }
}
