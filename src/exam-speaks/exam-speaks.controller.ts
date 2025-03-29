import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ExamSpeaksService } from './exam-speaks.service';
import { CreateExamSpeakDto } from './dto/create-exam-speak.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamSpeak } from './domain/exam-speak';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Examspeaks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exam-speaks',
  version: '1',
})
export class ExamSpeaksController {
  constructor(private readonly examSpeaksService: ExamSpeaksService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamSpeak,
  })
  create(@Body() createExamSpeakDto: CreateExamSpeakDto) {
    return this.examSpeaksService.create({ ...createExamSpeakDto });
  }
}
