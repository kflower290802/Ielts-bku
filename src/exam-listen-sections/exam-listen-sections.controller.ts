import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExamListenSectionsService } from './exam-listen-sections.service';
import { CreateExamListenSectionDto } from './dto/create-exam-listen-section.dto';
import { UpdateExamListenSectionDto } from './dto/update-exam-listen-section.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamListenSection } from './domain/exam-listen-section';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Examlistensections')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exam-listen-sections',
  version: '1',
})
export class ExamListenSectionsController {
  constructor(
    private readonly examListenSectionsService: ExamListenSectionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamListenSection,
  })
  @UseInterceptors(FileInterceptor('audio'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createExamListenSectionDto: CreateExamListenSectionDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.examListenSectionsService.create({
      ...createExamListenSectionDto,
      audio: file,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamListenSection,
  })
  findById(@Param('id') id: string) {
    return this.examListenSectionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamListenSection,
  })
  update(
    @Param('id') id: string,
    @Body() updateExamListenSectionDto: UpdateExamListenSectionDto,
  ) {
    return this.examListenSectionsService.update(
      id,
      updateExamListenSectionDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examListenSectionsService.remove(id);
  }
}
