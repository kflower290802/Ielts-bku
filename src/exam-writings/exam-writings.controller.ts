import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExamWritingsService } from './exam-writings.service';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamWriting } from './domain/exam-writing';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Examwritings')
@Controller({
  path: 'exam-writings',
  version: '1',
})
export class ExamWritingsController {
  constructor(private readonly examWritingsService: ExamWritingsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamWriting,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createExamWritingDto: CreateExamWritingDto,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.examWritingsService.create({ ...createExamWritingDto, image });
  }
}
