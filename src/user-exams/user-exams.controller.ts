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
import { UserExamsService } from './user-exams.service';
import { CreateUserExamDto } from './dto/create-user-exam.dto';
import { UpdateUserExamDto } from './dto/update-user-exam.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserExam } from './domain/user-exam';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllUserExamsDto } from './dto/find-all-user-exams.dto';

@ApiTags('Userexams')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exams',
  version: '1',
})
export class UserExamsController {
  constructor(private readonly userExamsService: UserExamsService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserExam,
  })
  create(@Body() createUserExamDto: CreateUserExamDto) {
    return this.userExamsService.create(createUserExamDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(UserExam),
  // })
  // async findAll(
  //   @Query() query: FindAllUserExamsDto,
  // ): Promise<InfinityPaginationResponseDto<UserExam>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.userExamsService.findAllWithPagination({
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
    type: UserExam,
  })
  findById(@Param('id') id: string) {
    return this.userExamsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExam,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserExamDto: UpdateUserExamDto,
  ) {
    return this.userExamsService.update(id, updateUserExamDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userExamsService.remove(id);
  }
}
