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
import { FlashCardsService } from './flash-cards.service';
import { CreateFlashCardDto } from './dto/create-flash-card.dto';
import { UpdateFlashCardDto } from './dto/update-flash-card.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FlashCard } from './domain/flash-card';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllFlashCardsDto } from './dto/find-all-flash-cards.dto';

@ApiTags('Flashcards')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'flash-cards',
  version: '1',
})
export class FlashCardsController {
  constructor(private readonly flashCardsService: FlashCardsService) {}

  @Post()
  @ApiCreatedResponse({
    type: FlashCard,
  })
  create(@Body() createFlashCardDto: CreateFlashCardDto) {
    return this.flashCardsService.create(createFlashCardDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(FlashCard),
  })
  async findAll(
    @Query() query: FindAllFlashCardsDto,
  ): Promise<InfinityPaginationResponseDto<FlashCard>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.flashCardsService.findAllWithPagination({
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
    type: FlashCard,
  })
  findById(@Param('id') id: string) {
    return this.flashCardsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: FlashCard,
  })
  update(
    @Param('id') id: string,
    @Body() updateFlashCardDto: UpdateFlashCardDto,
  ) {
    return this.flashCardsService.update(id, updateFlashCardDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.flashCardsService.remove(id);
  }
}
