import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PracticeSpeakingQuestionsService } from './practice-speaking-questions.service';
import { CreatePracticeSpeakingQuestionDto } from './dto/create-practice-speaking-question.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeSpeakingQuestion } from './domain/practice-speaking-question';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Practicespeakingquestions')
@Controller({
  path: 'practice-speaking-questions',
  version: '1',
})
export class PracticeSpeakingQuestionsController {
  constructor(
    private readonly practiceSpeakingQuestionsService: PracticeSpeakingQuestionsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    type: PracticeSpeakingQuestion,
  })
  create(
    @Body()
    createPracticeSpeakingQuestionDto: CreatePracticeSpeakingQuestionDto,
    @UploadedFile() audio: Express.Multer.File,
  ) {
    return this.practiceSpeakingQuestionsService.create({
      ...createPracticeSpeakingQuestionDto,
      audio,
    });
  }
}
