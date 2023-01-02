import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  async sendNotification(classId: string) {
    this.server
      .to(classId)
      .emit('notification', { message: 'New notification' });
  }
}
