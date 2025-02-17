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
import { unitsService } from './units.service';
import { CreateunitDto } from './dto/create-unit.dto';
import { UpdateunitDto } from './dto/update-unit.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { unit } from './domain/unit';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllunitsDto } from './dto/find-all-units.dto';

@ApiTags('Units')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'units',
  version: '1',
})
export class unitsController {
  constructor(private readonly unitsService: unitsService) {}

  @Post()
  @ApiCreatedResponse({
    type: unit,
  })
  create(@Body() createunitDto: CreateunitDto) {
    return this.unitsService.create(createunitDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(unit),
  // })
  // async findAll(
  //   @Query() query: FindAllunitsDto,
  // ): Promise<InfinityPaginationResponseDto<unit>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.unitsService.findAllWithPagination({
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
    type: unit,
  })
  findById(@Param('id') id: string) {
    return this.unitsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: unit,
  })
  update(@Param('id') id: string, @Body() updateunitDto: UpdateunitDto) {
    return this.unitsService.update(id, updateunitDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.unitsService.remove(id);
  }
}
