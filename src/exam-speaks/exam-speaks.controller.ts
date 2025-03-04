import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExamSpeaksService } from './exam-speaks.service';
import { CreateExamSpeakDto } from './dto/create-exam-speak.dto';
// import { UpdateExamSpeakDto } from './dto/update-exam-speak.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  // ApiOkResponse,
  // ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamSpeak } from './domain/exam-speak';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('audio'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createExamSpeakDto: CreateExamSpeakDto,
    @UploadedFile()
    audio: Express.Multer.File,
  ) {
    return this.examSpeaksService.create({ ...createExamSpeakDto, audio });
  }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: ExamSpeak,
  // })
  // findById(@Param('id') id: string) {
  //   return this.examSpeaksService.findById(id);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: ExamSpeak,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateExamSpeakDto: UpdateExamSpeakDto,
  // ) {
  //   return this.examSpeaksService.update(id, updateExamSpeakDto);
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.examSpeaksService.remove(id);
  // }
}
