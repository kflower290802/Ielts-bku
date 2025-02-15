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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import {
  // ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Exam } from './domain/exam';
// import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllExamsDto } from './dto/find-all-exams.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Exams')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exams',
  version: '1',
})
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Exam,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createExamDto: CreateExamDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.examsService.create({ ...createExamDto, file });
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Exam),
  })
  async findAll(
    @Query() query: FindAllExamsDto,
  ): Promise<InfinityPaginationResponseDto<Exam>> {
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
        ...query,
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
    type: Exam,
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
    type: Exam,
  })
  update(@Param('id') id: string, @Body() updateexamDto: UpdateExamDto) {
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
