import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExamWritingsService } from './exam-writings.service';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamWriting } from './domain/exam-writing';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateExamWritingDto } from './dto/update-exam-writing.dto';

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

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    @Body() updateExamWritingDto: UpdateExamWritingDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.examWritingsService.update(id, {
      ...updateExamWritingDto,
      image: file,
    });
  }
}
