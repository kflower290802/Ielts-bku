import { Injectable } from '@nestjs/common';
import ApiVideoClient from '@api.video/nodejs-client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideosService {
  constructor(private readonly client: ApiVideoClient) {}

  async uploadVideo(video: Express.Multer.File) {
    const filePath = path.resolve('./video-upload', video.filename);
    const size = video.size;
    const videoObj = await this.client.videos.create({
      title: 'test create',
      description: 'Test description',
      language: 'en',
      transcript: true,
      _public: true,
    });
    const result = await this.client.videos.upload(videoObj.videoId, filePath);
    fs.unlinkSync(filePath);
    return { video: result.assets?.hls, size };
  }
}
