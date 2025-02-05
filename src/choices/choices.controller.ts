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
} from '@nestjs/common';
import { choicesService } from './choices.service';
import { CreatechoiceDto } from './dto/create-choice.dto';
import { UpdatechoiceDto } from './dto/update-choice.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { choice } from './domain/choice';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllchoicesDto } from './dto/find-all-choices.dto';

@ApiTags('Choices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'choices',
  version: '1',
})
export class choicesController {
  constructor(private readonly choicesService: choicesService) {}

  @Post()
  @ApiCreatedResponse({
    type: choice,
  })
  create(@Body() createchoiceDto: CreatechoiceDto) {
    return this.choicesService.create(createchoiceDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(choice),
  })
  async findAll(
    @Query() query: FindAllchoicesDto,
  ): Promise<InfinityPaginationResponseDto<choice>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.choicesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
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
    type: choice,
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
    type: choice,
  })
  update(@Param('id') id: string, @Body() updatechoiceDto: UpdatechoiceDto) {
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
