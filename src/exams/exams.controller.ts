import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
  Request,
  UploadedFiles,
  Delete,
  Patch,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { TimeSpentDto } from './dto/time-spent.dto';

function paginateData(data: any[], page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = data.slice(startIndex, endIndex);

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createExamDto: CreateExamDto,
    @UploadedFiles()
    files: { audio?: Express.Multer.File[]; file: Express.Multer.File[] },
  ) {
    const { file, audio } = files;
    return this.examsService.create({
      ...createExamDto,
      file: file[0],
      audio: audio ? audio[0] : undefined,
    });
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() exam: Exam) {
    return this.examsService.update(id, exam);
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

  @Get('time-spent')
  @UseGuards(AuthGuard('jwt'))
  getTimeSpentByUserId(
    @Query() timeSpentDto: TimeSpentDto,
    @Request() request,
  ) {
    const userId = request.user.id;
    const { startTime, endTime } = timeSpentDto;
    return this.examsService.getTimeSpentByUserId(userId, startTime, endTime);
  }

  @Get('total-exam')
  getTotalExam() {
    return this.examsService.getTotalExam();
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
  exitExam(
    @Param('id') id: string,
    @Request() request,
    @Body() submitExamsDto: SubmitExamDto[],
  ) {
    const userId = request.user.id;
    return this.examsService.exitExam(id, userId, submitExamsDto);
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

  @Get('exam-detail/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  getExamDetail(@Param('id') id: string) {
    return this.examsService.getExamDetail(id);
  }
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }
}
