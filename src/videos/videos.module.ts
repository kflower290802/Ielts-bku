import { Module } from '@nestjs/common';
import ApiVideoClient from '@api.video/nodejs-client';
import { VideosService } from './videos.service';

@Module({
  providers: [
    VideosService,
    {
      provide: ApiVideoClient,
      useFactory: () => {
        return new ApiVideoClient({ apiKey: process.env.UPLOAD_API_KEY });
      },
    },
  ],
  exports: [VideosService],
})
export class VideosModule {}
