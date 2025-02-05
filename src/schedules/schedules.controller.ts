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
import { schedulesService } from './schedules.service';
import { CreatescheduleDto } from './dto/create-schedule.dto';
import { UpdatescheduleDto } from './dto/update-schedule.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { schedule } from './domain/schedule';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllschedulesDto } from './dto/find-all-schedules.dto';

@ApiTags('Schedules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'schedules',
  version: '1',
})
export class schedulesController {
  constructor(private readonly schedulesService: schedulesService) {}

  @Post()
  @ApiCreatedResponse({
    type: schedule,
  })
  create(@Body() createscheduleDto: CreatescheduleDto) {
    return this.schedulesService.create(createscheduleDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(schedule),
  })
  async findAll(
    @Query() query: FindAllschedulesDto,
  ): Promise<InfinityPaginationResponseDto<schedule>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.schedulesService.findAllWithPagination({
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
    type: schedule,
  })
  findById(@Param('id') id: string) {
    return this.schedulesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: schedule,
  })
  update(
    @Param('id') id: string,
    @Body() updatescheduleDto: UpdatescheduleDto,
  ) {
    return this.schedulesService.update(id, updatescheduleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
}
