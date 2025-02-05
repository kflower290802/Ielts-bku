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
import { questionsService } from './questions.service';
import { CreatequestionDto } from './dto/create-question.dto';
import { UpdatequestionDto } from './dto/update-question.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { question } from './domain/question';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllquestionsDto } from './dto/find-all-questions.dto';

@ApiTags('Questions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'questions',
  version: '1',
})
export class questionsController {
  constructor(private readonly questionsService: questionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: question,
  })
  create(@Body() createquestionDto: CreatequestionDto) {
    return this.questionsService.create(createquestionDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(question),
  })
  async findAll(
    @Query() query: FindAllquestionsDto,
  ): Promise<InfinityPaginationResponseDto<question>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.questionsService.findAllWithPagination({
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
    type: question,
  })
  findById(@Param('id') id: string) {
    return this.questionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: question,
  })
  update(
    @Param('id') id: string,
    @Body() updatequestionDto: UpdatequestionDto,
  ) {
    return this.questionsService.update(id, updatequestionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
