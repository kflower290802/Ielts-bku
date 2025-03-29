import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExamWritingsService } from './exam-writings.service';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExamWriting } from './domain/exam-writing';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Examwritings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: ExamWriting,
  // })
  // findById(@Param('id') id: string) {
  //   return this.examWritingsService.findById(id);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: ExamWriting,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateExamWritingDto: UpdateExamWritingDto,
  // ) {
  //   return this.examWritingsService.update(id, updateExamWritingDto);
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.examWritingsService.remove(id);
  // }
}
