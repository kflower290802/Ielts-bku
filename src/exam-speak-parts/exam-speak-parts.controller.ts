import { Controller, Post, Body } from '@nestjs/common';
import { ExamSpeakPartsService } from './exam-speak-parts.service';
import { CreateExamSpeakPartDto } from './dto/create-exam-speak-part.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamSpeakPart } from './domain/exam-speak-part';

@ApiTags('Examspeakparts')
@Controller({
  path: 'exam-speak-parts',
  version: '1',
})
export class ExamSpeakPartsController {
  constructor(private readonly examSpeakPartsService: ExamSpeakPartsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamSpeakPart,
  })
  create(@Body() createExamSpeakPartDto: CreateExamSpeakPartDto) {
    return this.examSpeakPartsService.create(createExamSpeakPartDto);
  }
}
