import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
} from '@nestjs/common';
import { PracticeListensService } from './practice-listens.service';
import { CreatePracticeListenDto } from './dto/create-practice-listen.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeListen } from './domain/practice-listen';
import { UpdatePracticeListenDto } from './dto/update-practice-listen.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Practicelistens')
@Controller({
  path: 'practice-listens',
  version: '1',
})
export class PracticeListensController {
  constructor(
    private readonly practiceListensService: PracticeListensService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeListen,
  })
  @UseInterceptors(FileInterceptor('audio'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPracticeListenDto: CreatePracticeListenDto,
    @UploadedFile() audio: Express.Multer.File,
  ): Promise<PracticeListen> {
    return this.practiceListensService.create({
      ...createPracticeListenDto,
      audio,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('audio'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updatePracticeListenDto: UpdatePracticeListenDto,
    @UploadedFile() audio: Express.Multer.File,
  ) {
    return this.practiceListensService.update(id, {
      ...updatePracticeListenDto,
      audio,
    });
  }
}
