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
import { testsService } from './tests.service';
import { CreatetestDto } from './dto/create-test.dto';
import { UpdatetestDto } from './dto/update-test.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { test } from './domain/test';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAlltestsDto } from './dto/find-all-tests.dto';

@ApiTags('Tests')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'tests',
  version: '1',
})
export class testsController {
  constructor(private readonly testsService: testsService) {}

  @Post()
  @ApiCreatedResponse({
    type: test,
  })
  create(@Body() createtestDto: CreatetestDto) {
    return this.testsService.create(createtestDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(test),
  })
  async findAll(
    @Query() query: FindAlltestsDto,
  ): Promise<InfinityPaginationResponseDto<test>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.testsService.findAllWithPagination({
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
    type: test,
  })
  findById(@Param('id') id: string) {
    return this.testsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: test,
  })
  update(@Param('id') id: string, @Body() updatetestDto: UpdatetestDto) {
    return this.testsService.update(id, updatetestDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.testsService.remove(id);
  }
}
