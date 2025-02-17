import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  // Query,
} from '@nestjs/common';
import { BlogLessonsService } from './blog-lessons.service';
import { CreateBlogLessonDto } from './dto/create-blog-lesson.dto';
import { UpdateBlogLessonDto } from './dto/update-blog-lesson.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BlogLesson } from './domain/blog-lesson';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllBlogLessonsDto } from './dto/find-all-blog-lessons.dto';

@ApiTags('Bloglessons')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'blog-lessons',
  version: '1',
})
export class BlogLessonsController {
  constructor(private readonly blogLessonsService: BlogLessonsService) {}

  @Post()
  @ApiCreatedResponse({
    type: BlogLesson,
  })
  create(@Body() createBlogLessonDto: CreateBlogLessonDto) {
    return this.blogLessonsService.create(createBlogLessonDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(BlogLesson),
  // })
  // async findAll(
  //   @Query() query: FindAllBlogLessonsDto,
  // ): Promise<InfinityPaginationResponseDto<BlogLesson>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.blogLessonsService.findAllWithPagination({
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
    type: BlogLesson,
  })
  findById(@Param('id') id: string) {
    return this.blogLessonsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: BlogLesson,
  })
  update(
    @Param('id') id: string,
    @Body() updateBlogLessonDto: UpdateBlogLessonDto,
  ) {
    return this.blogLessonsService.update(id, updateBlogLessonDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.blogLessonsService.remove(id);
  }
}
