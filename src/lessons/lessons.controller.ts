import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Lesson } from './domain/lesson';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllLessonsDto } from './dto/find-all-lessons.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@ApiTags('Lessons')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'lessons',
  version: '1',
})
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Lesson,
  })
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './video-upload',
        filename: (_, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    return this.lessonsService.create({ ...createLessonDto, video });
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(Lesson),
  // })
  // async findAll(
  //   @Query() query: FindAllLessonsDto,
  // ): Promise<InfinityPaginationResponseDto<Lesson>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.lessonsService.findAllWithPagination({
  //       paginationOptions: {
  //         page,
  //         limit,
  //       },
  //     }),
  //     { page, limit },
  //   );
  // }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Lesson,
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
    type: Lesson,
  })
  update(@Param('id') id: string, @Body() updatelessonDto: UpdateLessonDto) {
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
