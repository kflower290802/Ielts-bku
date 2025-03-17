import { Controller, Post, Body } from '@nestjs/common';
import { ExamListenTypesService } from './exam-listen-types.service';
import { CreateExamListenTypeDto } from './dto/create-exam-listen-type.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamListenType } from './domain/exam-listen-type';

@ApiTags('Examlistentypes')
@ApiBearerAuth()
@Controller({
  path: 'exam-listen-types',
  version: '1',
})
export class ExamListenTypesController {
  constructor(
    private readonly examListenTypesService: ExamListenTypesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamListenType,
  })
  create(@Body() createExamListenTypeDto: CreateExamListenTypeDto) {
    return this.examListenTypesService.create(createExamListenTypeDto);
  }
}
