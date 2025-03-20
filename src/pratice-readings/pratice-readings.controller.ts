import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PraticeReadingsService } from './pratice-readings.service';
import { CreatePraticeReadingDto } from './dto/create-pratice-reading.dto';
import { UpdatePraticeReadingDto } from './dto/update-pratice-reading.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PraticeReading } from './domain/pratice-reading';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Praticereadings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'pratice-readings',
  version: '1',
})
export class PraticeReadingsController {
  constructor(
    private readonly praticeReadingsService: PraticeReadingsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PraticeReading,
  })
  create(@Body() createPraticeReadingDto: CreatePraticeReadingDto) {
    return this.praticeReadingsService.create(createPraticeReadingDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(PraticeReading),
  // })
  // async findAll(
  //   @Query() query: FindAllPraticeReadingsDto,
  // ): Promise<InfinityPaginationResponseDto<PraticeReading>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.praticeReadingsService.findAllWithPagination({
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
    type: PraticeReading,
  })
  findById(@Param('id') id: string) {
    return this.praticeReadingsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PraticeReading,
  })
  update(
    @Param('id') id: string,
    @Body() updatePraticeReadingDto: UpdatePraticeReadingDto,
  ) {
    return this.praticeReadingsService.update(id, updatePraticeReadingDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.praticeReadingsService.remove(id);
  }
}
