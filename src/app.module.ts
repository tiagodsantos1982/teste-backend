import { Module } from '@nestjs/common';
import { VideosController } from './controllers/video.controller';
import { VideoModule } from './controllers/video.module';
import { RouterModule, Routes } from 'nest-router';
import { VideosService } from './services/videos.service';

/**
 * https://github.com/nestjsx/nest-router
 * 
 */
const routes: Routes = [
  {
    path:'v1',
    module: VideoModule,
  }
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    VideoModule
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class AppModule {}
