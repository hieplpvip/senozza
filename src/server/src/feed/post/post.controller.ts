import { Controller } from '@nestjs/common';
import { PostService } from './post.service';

@Controller(':feedId/post')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
