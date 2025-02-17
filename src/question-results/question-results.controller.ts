import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  // Query,
} from '@nestjs/common';
import { question_resultsService } from './question-results.service';
import { Createquestion_resultDto } from './dto/create-question-result.dto';
import { Updatequestion_resultDto } from './dto/update-question-result.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { question_result } from './domain/question-result';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllquestion_resultsDto } from './dto/find-all-question-results.dto';

@ApiTags('Question results')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'question-results',
  version: '1',
})
export class question_resultsController {
  constructor(
    private readonly questionResultsService: question_resultsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: question_result,
  })
  create(@Body() createquestion_resultDto: Createquestion_resultDto) {
    return this.questionResultsService.create(createquestion_resultDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(question_result),
  // })
  // async findAll(
  //   @Query() query: FindAllquestion_resultsDto,
  // ): Promise<InfinityPaginationResponseDto<question_result>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.questionResultsService.findAllWithPagination({
  //       paginationOptions: {
  //         page,
  //         limit,
  //       },
  //     }),
  //     { page, limit },
  //   );
  // }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: question_result,
  })
  findById(@Param('id') id: string) {
    return this.questionResultsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: question_result,
  })
  update(
    @Param('id') id: string,
    @Body() updatequestion_resultDto: Updatequestion_resultDto,
  ) {
    return this.questionResultsService.update(id, updatequestion_resultDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.questionResultsService.remove(id);
  }
}
