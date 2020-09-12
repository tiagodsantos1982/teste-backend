import { Module } from '@nestjs/common';
import { VideosController } from '../controllers/video.controller';
import { VideosService } from '../services/videos.service';
@Module({
  controllers: [VideosController/*,n-controllers*/],
  providers:[VideosService]
})
export class VideoModule {}