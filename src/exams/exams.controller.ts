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
import { examsService } from './exams.service';
import { CreateexamDto } from './dto/create-exam.dto';
import { UpdateexamDto } from './dto/update-exam.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { exam } from './domain/exam';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllexamsDto } from './dto/find-all-exams.dto';

@ApiTags('Exams')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exams',
  version: '1',
})
export class examsController {
  constructor(private readonly examsService: examsService) {}

  @Post()
  @ApiCreatedResponse({
    type: exam,
  })
  create(@Body() createexamDto: CreateexamDto) {
    return this.examsService.create(createexamDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(exam),
  })
  async findAll(
    @Query() query: FindAllexamsDto,
  ): Promise<InfinityPaginationResponseDto<exam>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.examsService.findAllWithPagination({
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
    type: exam,
  })
  findById(@Param('id') id: string) {
    return this.examsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: exam,
  })
  update(@Param('id') id: string, @Body() updateexamDto: UpdateexamDto) {
    return this.examsService.update(id, updateexamDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }
}
