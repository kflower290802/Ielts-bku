import { Controller, Post, Body } from '@nestjs/common';
import { ExamReadingTypesService } from './exam-reading-types.service';
import { CreateExamReadingTypeDto } from './dto/create-exam-reading-type.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamReadingType } from './domain/exam-reading-type';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('Examreadingtypes')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
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
  create(@Body() createExamReadingTypeDto: CreateExamReadingTypeDto) {
    return this.examReadingTypesService.create(createExamReadingTypeDto);
  }
}
