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
import { ExplainationsService } from './explainations.service';
import { CreateExplainationDto } from './dto/create-explaination.dto';
import { UpdateExplainationDto } from './dto/update-explaination.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Explaination } from './domain/explaination';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllExplainationsDto } from './dto/find-all-explainations.dto';

@ApiTags('Explainations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'explainations',
  version: '1',
})
export class ExplainationsController {
  constructor(private readonly explainationsService: ExplainationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Explaination,
  })
  create(@Body() createExplainationDto: CreateExplainationDto) {
    return this.explainationsService.create(createExplainationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Explaination),
  })
  async findAll(
    @Query() query: FindAllExplainationsDto,
  ): Promise<InfinityPaginationResponseDto<Explaination>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.explainationsService.findAllWithPagination({
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
    type: Explaination,
  })
  findById(@Param('id') id: string) {
    return this.explainationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Explaination,
  })
  update(
    @Param('id') id: string,
    @Body() updateExplainationDto: UpdateExplainationDto,
  ) {
    return this.explainationsService.update(id, updateExplainationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.explainationsService.remove(id);
  }
}
