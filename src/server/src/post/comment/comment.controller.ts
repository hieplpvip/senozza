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
import { CommentSortBy, UserRole } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller()
@ApiTags('post')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
    await this.commentService.answer(
      new Types.ObjectId(postId),
      postCreatedDto,
    );

    return { message: 'Answer successfully' };
  }

  /** READ */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'sortBy', enum: CommentSortBy })
  @ApiOkResponse({ type: CommentDto, isArray: true })
  async listAll(
    @ExtractedUser() userDto: UserDto,
    @Query('postId') postId: string,
    @Query('sortBy') sortedField: CommentSortBy,
  ): Promise<CommentDto[]> {
    const coll = await this.commentService.find(
      new Types.ObjectId(postId),
      { $exists: true },
      new Types.ObjectId(userDto._id),
      sortedField,
    );

    if (coll.length === 0) return [];
    const { answers } = coll[0];
    return await this.commentService.commentsMapper(answers);
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
    if (upvote === 1) {
      await this.commentService.upvote(
        new Types.ObjectId(postId),
        new Types.ObjectId(commentId),
        new Types.ObjectId(userDto._id),
      );
    } else {
      await this.commentService.downvote(
        new Types.ObjectId(postId),
        new Types.ObjectId(commentId),
        new Types.ObjectId(userDto._id),
      );
    }

    return { message: 'Vote successfully' };
  }

  @Patch('markAnswer')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async markAnswer(
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
  ) {
    await this.commentService.markAnswer(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
    );

    return { message: 'Mark answer successfully' };
  }

  @Put('edit')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CommentUpdateDto })
  async edit(
    @ExtractedUser() userDto: UserDto,
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
    @Body() postUpdateDto: CommentUpdateDto,
  ): Promise<CommentDto[]> {
    await this.commentService.edit(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
      postUpdateDto,
    );

    const coll = await this.commentService.find(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
      new Types.ObjectId(userDto._id),
      CommentSortBy.CREATED_DATE,
    );

    if (coll.length === 0) return [];
    const { answers } = coll[0];
    console.log(answers);
    return this.commentService.commentsMapper(answers);
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Query('postId') postId: string,
    @Query('commentId') commentId: string,
  ) {
    await this.commentService.delete(
      new Types.ObjectId(postId),
      new Types.ObjectId(commentId),
    );

    return { mesage: 'Delete successfully' };
  }
}
