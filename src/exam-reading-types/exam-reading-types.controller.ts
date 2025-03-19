import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExamReadingTypesService } from './exam-reading-types.service';
import { CreateExamReadingTypeDto } from './dto/create-exam-reading-type.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamReadingType } from './domain/exam-reading-type';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Examreadingtypes')
@Controller({
  path: 'exam-reading-types',
  version: '1',
})
export class ExamReadingTypesController {
  constructor(
    private readonly examReadingTypesService: ExamReadingTypesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamReadingType,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createExamReadingTypeDto: CreateExamReadingTypeDto,
    @UploadedFile()
    image?: Express.Multer.File,
  ) {
    return this.examReadingTypesService.create({
      ...createExamReadingTypeDto,
      image,
    });
  }
}
