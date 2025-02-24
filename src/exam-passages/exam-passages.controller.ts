import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
  // Query,
} from '@nestjs/common';
import { ExamPassagesService } from './exam-passages.service';
import { CreateExamPassageDto } from './dto/create-exam-passage.dto';
import { UpdateExamPassageDto } from './dto/update-exam-passage.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamPassage } from './domain/exam-passage';
@ApiTags('Exampassages')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exam-passages',
  version: '1',
})
export class ExamPassagesController {
  constructor(private readonly examPassagesService: ExamPassagesService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamPassage,
  })
  create(@Body() createExamPassageDto: CreateExamPassageDto) {
    return this.examPassagesService.create(createExamPassageDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamPassage,
  })
  findById(@Param('id') id: string) {
    return this.examPassagesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamPassage,
  })
  update(
    @Param('id') id: string,
    @Body() updateExamPassageDto: UpdateExamPassageDto,
  ) {
    return this.examPassagesService.update(id, updateExamPassageDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examPassagesService.remove(id);
  }
}
