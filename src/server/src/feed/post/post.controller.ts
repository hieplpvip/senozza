import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto';
import { PostCreateDto, PostDto } from './dto';
import { PostService } from './post.service';

@Controller()
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /** CREATE */
  @Post('answer')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: PostCreateDto })
  async answer(
    @ExtractedUser() userDto: UserDto,
    @Query('feedId') feedId: string,
    @Body() postCreatedDto: PostCreateDto,
  ) {
    postCreatedDto.user = new Types.ObjectId(userDto._id);
    await this.postService.answer(new Types.ObjectId(feedId), postCreatedDto);
  }

  /** READ */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDto, isArray: true })
  async listAll(
    @ExtractedUser() userDto: UserDto,
    @Query('feedId') feedId: string,
    @Query('sortBy') sortedField: string,
  ): Promise<PostDto[]> {
    const coll = await this.postService.listAll(
      new Types.ObjectId(feedId),
      sortedField,
    );
    const { answers } = coll[0];
    return await this.postService.postMapper(answers);
  }

  /** UPDATE */
  @Patch('vote')
  @UseGuards(JwtAuthGuard)
  async vote(
    @ExtractedUser() userDto: UserDto,
    @Query('feedId') feedId: string,
    @Query('postId') postId: string,
    @Query('upvote', ParseIntPipe) upvote: number,
  ) {
    await this.postService.vote(
      new Types.ObjectId(feedId),
      new Types.ObjectId(postId),
      upvote,
    );
  }

  /** DELETE */
}
