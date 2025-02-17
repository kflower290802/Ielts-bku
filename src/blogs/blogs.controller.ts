import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards,
  // Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Blog } from './domain/blog';
// import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllBlogsDto } from './dto/find-all-blogs.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../accounts/infrastructure/persistence/document/entities/account.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Blogs')
@ApiBearerAuth()
@Controller({
  path: 'blogs',
  version: '1',
})
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Blog,
  })
  // @UseGuards(AuthGuard('jwt'))
  // @Roles(RoleEnum.Teacher)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.blogsService.create({ ...createBlogDto, image });
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(Blog),
  // })
  // // @Roles(RoleEnum.Admin)
  // async findAll(
  //   @Query() query: FindAllBlogsDto,
  // ): Promise<InfinityPaginationResponseDto<Blog>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.blogsService.findAllWithPagination({
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
    type: Blog,
  })
  findById(@Param('id') id: string) {
    return this.blogsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Blog,
  })
  @Roles(RoleEnum.Teacher, RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
