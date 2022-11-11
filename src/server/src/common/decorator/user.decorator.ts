import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
