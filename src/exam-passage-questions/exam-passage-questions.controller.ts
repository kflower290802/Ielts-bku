import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
  Query,
} from '@nestjs/common';
import { ExamPassageQuestionsService } from './exam-passage-questions.service';
import { CreateExamPassageQuestionDto } from './dto/create-exam-passage-question.dto';
import { UpdateExamPassageQuestionDto } from './dto/update-exam-passage-question.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamPassageQuestion } from './domain/exam-passage-question';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllExamPassageQuestionsDto } from './dto/find-all-exam-passage-questions.dto';

@ApiTags('Exampassagequestions')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exam-passage-questions',
  version: '1',
})
export class ExamPassageQuestionsController {
  constructor(
    private readonly examPassageQuestionsService: ExamPassageQuestionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamPassageQuestion,
  })
  create(@Body() createExamPassageQuestionDto: CreateExamPassageQuestionDto) {
    return this.examPassageQuestionsService.create(
      createExamPassageQuestionDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ExamPassageQuestion),
  })
  async findAll(
    @Query() query: FindAllExamPassageQuestionsDto,
  ): Promise<InfinityPaginationResponseDto<ExamPassageQuestion>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.examPassageQuestionsService.findAllWithPagination({
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
    type: ExamPassageQuestion,
  })
  findById(@Param('id') id: string) {
    return this.examPassageQuestionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamPassageQuestion,
  })
  update(
    @Param('id') id: string,
    @Body() updateExamPassageQuestionDto: UpdateExamPassageQuestionDto,
  ) {
    return this.examPassageQuestionsService.update(
      id,
      updateExamPassageQuestionDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examPassageQuestionsService.remove(id);
  }
}
