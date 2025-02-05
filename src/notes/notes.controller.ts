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
import { notesService } from './notes.service';
import { CreatenoteDto } from './dto/create-note.dto';
import { UpdatenoteDto } from './dto/update-note.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { note } from './domain/note';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllnotesDto } from './dto/find-all-notes.dto';

@ApiTags('Notes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'notes',
  version: '1',
})
export class notesController {
  constructor(private readonly notesService: notesService) {}

  @Post()
  @ApiCreatedResponse({
    type: note,
  })
  create(@Body() createnoteDto: CreatenoteDto) {
    return this.notesService.create(createnoteDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(note),
  })
  async findAll(
    @Query() query: FindAllnotesDto,
  ): Promise<InfinityPaginationResponseDto<note>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.notesService.findAllWithPagination({
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
    type: note,
  })
  findById(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: note,
  })
  update(@Param('id') id: string, @Body() updatenoteDto: UpdatenoteDto) {
    return this.notesService.update(id, updatenoteDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
