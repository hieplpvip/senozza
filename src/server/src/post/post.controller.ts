import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { NotificationCreateDto } from 'src/notification/dto';
import { NotificationService } from 'src/notification/notification.service';
import { UserDto } from 'src/user/dto';
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
import { PostService } from './post.service';

@Controller()
@ApiTags('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly classService: ClassService,
    private readonly notificationService: NotificationService,
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

    // add notification
    const postType =
      postCreateDto.category == 'announcement'
        ? 'an announcement'
        : 'a question';
    const { courseCode, courseName } = await this.classService.find(
      postCreateDto.classId,
    );
    const notification = new NotificationCreateDto({
      message: `${userDto.firstName} ${userDto.lastName} has posted ${postType} in ${courseCode}-${courseName}`,
      createdAt: new Date().toISOString(),
      to: [],
      class: postCreateDto.classId,
    });
    await this.notificationService.create(notification, classId, 'new post');

    return await this.postService.postMapper(post);
  }

  /** READ */
  @Get('get')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDto })
  async get(@Query('postId') postId: string): Promise<PostDto> {
    const post = await this.postService.getOne(new Types.ObjectId(postId));
    if (!post) throw new NotFoundException({ message: 'Post not found' });

    return await this.postService.postMapper(post);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDto, isArray: true })
  async listAll(@Query('classId') classId: string): Promise<PostDto[]> {
    const posts = await this.postService.listAll(new Types.ObjectId(classId));

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
  ): Promise<PostDto> {
    const post = await this.postService.edit(
      new Types.ObjectId(postId),
      postUpdateDto,
    );
    if (!post) throw new NotFoundException({ message: 'Post not found' });

    return this.postService.postMapper(post);
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Boolean })
  async delete(
    @Query('classId') classId: string,
    @Query('postId') postId: string,
  ): Promise<boolean> {
    await Promise.all([
      this.postService.delete(new Types.ObjectId(postId)),
      this.classService.removePost(
        new Types.ObjectId(classId),
        new Types.ObjectId(postId),
      ),
    ]);

    return true;
  }
}
