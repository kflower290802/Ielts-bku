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
import { test_resultsService } from './test-results.service';
import { Createtest_resultDto } from './dto/create-test-result.dto';
import { Updatetest_resultDto } from './dto/update-test-result.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { test_result } from './domain/test-result';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAlltest_resultsDto } from './dto/find-all-test-results.dto';

@ApiTags('Test results')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'test-results',
  version: '1',
})
export class test_resultsController {
  constructor(private readonly testResultsService: test_resultsService) {}

  @Post()
  @ApiCreatedResponse({
    type: test_result,
  })
  create(@Body() createtest_resultDto: Createtest_resultDto) {
    return this.testResultsService.create(createtest_resultDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(test_result),
  })
  async findAll(
    @Query() query: FindAlltest_resultsDto,
  ): Promise<InfinityPaginationResponseDto<test_result>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.testResultsService.findAllWithPagination({
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
    type: test_result,
  })
  findById(@Param('id') id: string) {
    return this.testResultsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: test_result,
  })
  update(
    @Param('id') id: string,
    @Body() updatetest_resultDto: Updatetest_resultDto,
  ) {
    return this.testResultsService.update(id, updatetest_resultDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.testResultsService.remove(id);
  }
}
