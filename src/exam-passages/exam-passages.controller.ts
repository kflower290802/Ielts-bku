import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllExamPassagesDto } from './dto/find-all-exam-passages.dto';

@ApiTags('Exampassages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ExamPassage),
  })
  async findAll(
    @Query() query: FindAllExamPassagesDto,
  ): Promise<InfinityPaginationResponseDto<ExamPassage>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.examPassagesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
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
