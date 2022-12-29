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
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
import { PostService } from './post.service';

@Controller()
@ApiTags('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly classService: ClassService,
  ) {}

  /** CREATE */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: PostCreateDto })
  @ApiOkResponse({ type: PostDto })
  async create(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') classId: string,
    @Body() postCreateDto: PostCreateDto,
  ): Promise<PostDto> {
    // create post
    postCreateDto.classId = new Types.ObjectId(classId);
    postCreateDto.question.user = new Types.ObjectId(userDto._id);
    const post = await this.postService.create(postCreateDto);
    // add post to class
    this.classService.addPost(postCreateDto.classId, post._id);

    return await this.postService.postMapper(post);
  }

  /** READ */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDto, isArray: true })
  async listAll(@Query('classId') classId: string): Promise<PostDto[]> {
    const posts = await this.postService.listAll(new Types.ObjectId(classId));

    return await this.postService.postsMapper(posts);
  }

  @Get('pin')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDto, isArray: true })
  async listPin(@Query('classId') classId: string): Promise<PostDto[]> {
    const posts = await this.postService.listPin(new Types.ObjectId(classId));

    return await this.postService.postsMapper(posts);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDto, isArray: true })
  async listFilter(
    @Query('classId') classId: string,
    @Query('category') category: string,
  ): Promise<PostDto[]> {
    const posts = await this.postService.filterCategory(
      new Types.ObjectId(classId),
      category,
    );

    return await this.postService.postsMapper(posts);
  }

  /** UPDATE */
  @Put('edit')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: PostUpdateDto })
  async edit(
    @ExtractedUser() userDto: UserDto,
    @Query('postId') postId: string,
    @Body() postUpdateDto: PostUpdateDto,
  ) {
    await this.postService.edit(new Types.ObjectId(postId), postUpdateDto);
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Query('postId') postId: string) {
    await this.postService.delete(new Types.ObjectId(postId));
  }
}
