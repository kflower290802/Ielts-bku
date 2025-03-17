import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ExamListenSectionsService } from './exam-listen-sections.service';
import { CreateExamListenSectionDto } from './dto/create-exam-listen-section.dto';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamListenSection } from './domain/exam-listen-section';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Examlistensections')
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
  create(@Body() createExamListenSectionDto: CreateExamListenSectionDto) {
    return this.examListenSectionsService.create({
      ...createExamListenSectionDto,
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
