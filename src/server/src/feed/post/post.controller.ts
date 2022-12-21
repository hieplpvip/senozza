import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto';
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
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
  @ApiQuery({ name: 'sortBy', description: '"createdDate" or "upvote"' })
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

  @Put('edit')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: PostUpdateDto })
  async edit(
    @ExtractedUser() userDto: UserDto,
    @Query('feedId') feedId: string,
    @Query('postId') postId: string,
    @Body() postUpdateDto: PostUpdateDto,
  ) {
    await this.postService.edit(
      new Types.ObjectId(feedId),
      new Types.ObjectId(postId),
      postUpdateDto,
    );
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Query('feedId') feedId: string,
    @Query('postId') postId: string,
  ) {
    await this.postService.delete(
      new Types.ObjectId(feedId),
      new Types.ObjectId(postId),
    );
  }
}
