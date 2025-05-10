import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
} from '@nestjs/common';
import { PracticeSpeakingQuestionsService } from './practice-speaking-questions.service';
import { CreatePracticeSpeakingQuestionDto } from './dto/create-practice-speaking-question.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeSpeakingQuestion } from './domain/practice-speaking-question';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePracticeSpeakingQuestionDto } from './dto/update-practice-speaking-question.dto';
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

  @Patch(':id')
  @UseInterceptors(FileInterceptor('audio'))
  update(
    @Param('id') id: string,
    @Body()
    updatePracticeSpeakingQuestionDto: UpdatePracticeSpeakingQuestionDto,
    @UploadedFile() audio?: Express.Multer.File,
  ) {
    return this.practiceSpeakingQuestionsService.update(id, {
      ...updatePracticeSpeakingQuestionDto,
      audio,
    });
  }
}
