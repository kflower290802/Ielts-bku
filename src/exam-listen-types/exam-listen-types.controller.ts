import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ExamListenTypesService } from './exam-listen-types.service';
import { CreateExamListenTypeDto } from './dto/create-exam-listen-type.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamListenType } from './domain/exam-listen-type';
import { UpdateExamListenTypeDto } from './dto/update-exam-listen-type.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamListenTypeDto: UpdateExamListenTypeDto,
  ) {
    return this.examListenTypesService.update(id, updateExamListenTypeDto);
  }
}
