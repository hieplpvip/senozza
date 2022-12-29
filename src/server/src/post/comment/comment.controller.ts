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
import { CommentCreateDto, CommentDto, CommentUpdateDto } from './dto';
import { CommentService } from './comment.service';

@Controller()
@ApiTags('post')
export class CommentController {
  constructor(private readonly postService: CommentService) {}

  /** CREATE */
  @Post('answer')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CommentCreateDto })
  async answer(
    @ExtractedUser() userDto: UserDto,
    @Query('postId') postId: string,
    @Body() postCreatedDto: CommentCreateDto,
  ) {
    postCreatedDto.user = new Types.ObjectId(userDto._id);
    await this.postService.answer(new Types.ObjectId(postId), postCreatedDto);
  }

  /** READ */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'sortBy', description: '"createdDate" or "upvote"' })
  @ApiOkResponse({ type: CommentDto, isArray: true })
  async listAll(
    @ExtractedUser() userDto: UserDto,
    @Query('postId') postId: string,
    @Query('sortBy') sortedField: string,
  ): Promise<CommentDto[]> {
    const coll = await this.postService.listAll(
      new Types.ObjectId(postId),
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
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
    @Query('upvote', ParseIntPipe) upvote: number,
  ) {
    await this.postService.vote(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
      upvote,
    );
  }

  @Put('edit')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CommentUpdateDto })
  async edit(
    @ExtractedUser() userDto: UserDto,
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
    @Body() postUpdateDto: CommentUpdateDto,
  ) {
    await this.postService.edit(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
      postUpdateDto,
    );
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
  ) {
    await this.postService.delete(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
    );
  }
}
