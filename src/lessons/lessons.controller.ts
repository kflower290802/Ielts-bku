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
import { lessonsService } from './lessons.service';
import { CreatelessonDto } from './dto/create-lesson.dto';
import { UpdatelessonDto } from './dto/update-lesson.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { lesson } from './domain/lesson';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAlllessonsDto } from './dto/find-all-lessons.dto';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'lessons',
  version: '1',
})
export class lessonsController {
  constructor(private readonly lessonsService: lessonsService) {}

  @Post()
  @ApiCreatedResponse({
    type: lesson,
  })
  create(@Body() createlessonDto: CreatelessonDto) {
    return this.lessonsService.create(createlessonDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(lesson),
  })
  async findAll(
    @Query() query: FindAlllessonsDto,
  ): Promise<InfinityPaginationResponseDto<lesson>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.lessonsService.findAllWithPagination({
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
    type: lesson,
  })
  findById(@Param('id') id: string) {
    return this.lessonsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: lesson,
  })
  update(@Param('id') id: string, @Body() updatelessonDto: UpdatelessonDto) {
    return this.lessonsService.update(id, updatelessonDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
