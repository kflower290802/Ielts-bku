import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PracticeWritingsService } from './practice-writings.service';
import { CreatePracticeWritingDto } from './dto/create-practice-writing.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeWriting } from './domain/practice-writing';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Practicewritings')
@Controller({
  path: 'practice-writings',
  version: '1',
})
export class PracticeWritingsController {
  constructor(
    private readonly practiceWritingsService: PracticeWritingsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeWriting,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPracticeWritingDto: CreatePracticeWritingDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.practiceWritingsService.create({
      ...createPracticeWritingDto,
      image,
    });
  }
}
