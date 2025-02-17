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
import { learnersService } from './learners.service';
import { CreatelearnerDto } from './dto/create-learner.dto';
import { UpdatelearnerDto } from './dto/update-learner.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { learner } from './domain/learner';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAlllearnersDto } from './dto/find-all-learners.dto';

@ApiTags('Learners')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'learners',
  version: '1',
})
export class learnersController {
  constructor(private readonly learnersService: learnersService) {}

  @Post()
  @ApiCreatedResponse({
    type: learner,
  })
  create(@Body() createlearnerDto: CreatelearnerDto) {
    return this.learnersService.create(createlearnerDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(learner),
  // })
  // async findAll(
  //   @Query() query: FindAlllearnersDto,
  // ): Promise<InfinityPaginationResponseDto<learner>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.learnersService.findAllWithPagination({
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
    type: learner,
  })
  findById(@Param('id') id: string) {
    return this.learnersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: learner,
  })
  update(@Param('id') id: string, @Body() updatelearnerDto: UpdatelearnerDto) {
    return this.learnersService.update(id, updatelearnerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.learnersService.remove(id);
  }
}
