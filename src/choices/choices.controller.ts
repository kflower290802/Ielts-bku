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
import { ChoicesService } from './choices.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Choice } from './domain/choice';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllChoicesDto } from './dto/find-all-choices.dto';

@ApiTags('Choices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'choices',
  version: '1',
})
export class choicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Choice,
  })
  create(@Body() createchoiceDto: CreateChoiceDto) {
    return this.choicesService.create(createchoiceDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(Choice),
  // })
  // async findAll(
  //   @Query() query: FindAllChoicesDto,
  // ): Promise<InfinityPaginationResponseDto<Choice>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.choicesService.findAllWithPagination({
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
    type: Choice,
  })
  findById(@Param('id') id: string) {
    return this.choicesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Choice,
  })
  update(@Param('id') id: string, @Body() updatechoiceDto: UpdateChoiceDto) {
    return this.choicesService.update(id, updatechoiceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.choicesService.remove(id);
  }
}
