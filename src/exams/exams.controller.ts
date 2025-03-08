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
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Exam } from './domain/exam';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse } from '../utils/dto/infinity-pagination-response.dto';
import { FindAllExamsDto } from './dto/find-all-exams.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubmitExamDto } from './dto/submit-exam.dto';

function paginateData(data: any[], page = 1, limit = 10) {
  // Tính toán vị trí bắt đầu và kết thúc của dữ liệu cần lấy
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Cắt dữ liệu theo trang
  const paginatedData = data.slice(startIndex, endIndex);

  // Tổng số trang
  const totalPages = Math.ceil(data.length / limit);

  return {
    data: paginatedData,
    page: page,
    limit: limit,
    total: data.length,
    pages: totalPages,
  };
}

@ApiTags('Exams')
@ApiBearerAuth()
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
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query() query: FindAllExamsDto,
    @Request() request,
  ): Promise<any> {
    const userId = request.user.id;
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const exams = await this.examsService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      userId,
      ...query,
    });
    return paginateData(exams, page, limit);
  }

  @Get('year')
  @ApiOkResponse({ type: [Number] })
  findYearsExam() {
    return this.examsService.findYearsExam();
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

  @Get('start-exam/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  startExam(@Param('id') id: string, @Request() request) {
    const userId = request.user.id;
    return this.examsService.startExam(id, userId);
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
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(id, updateExamDto);
  }

  @Get('exam/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  findExamData(@Param('id') id: string, @Request() request) {
    const userId = request.user.id;
    return this.examsService.getExamData(id, userId);
  }
  @Post('exit-exam/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  exitExam(@Param('id') id: string, @Request() request) {
    const userId = request.user.id;
    return this.examsService.exitExam(id, userId);
  }

  @Get('exam-summary/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  getExamSummary(@Param('id') id: string) {
    return this.examsService.getExamSummaryByUserExam(id);
  }

  @Post('submit-exam/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: [SubmitExamDto] })
  submitExam(
    @Param('id') id: string,
    @Body() submitExamsDto: SubmitExamDto[],
    @Request() request,
  ) {
    const userId = request.user.id;
    return this.examsService.submitExam(id, userId, submitExamsDto);
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
