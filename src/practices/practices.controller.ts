import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Practice } from './domain/practice';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResponse } from '../utils/dto/infinity-pagination-response.dto';
import { FindAllPracticesDto } from './dto/find-all-practices.dto';
import { paginateData } from '../utils/paginate';

@ApiTags('Practices')
@Controller({
  path: 'practices',
  version: '1',
})
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Practice,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPracticeDto: CreatePracticeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.practicesService.create({ ...createPracticeDto, image });
  }

  @Get('start-practice/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  startExam(@Param('id') id: string, @Request() request) {
    const userId = request.user.id;
    return this.practicesService.startPractice(id, userId);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Practice),
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: FindAllPracticesDto, @Request() request) {
    const userId = request.user.id;
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const practices = await this.practicesService.findAllWithPagination({
      userId,
      ...query,
    });
    return paginateData(practices, page, limit);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getPractice(@Param('id') id: string, @Request() request) {
    const userId = request.user?.id;
    return this.practicesService.getUserPractice(id, userId);
  }

  @Post('submit/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  submitPractice(@Param('id') id: string, @Request() request) {
    const userId = request.user.id;
    return this.practicesService.submitPractice(id, userId);
  }
}
