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
import { suggestionsService } from './suggestions.service';
import { CreatesuggestionDto } from './dto/create-suggestion.dto';
import { UpdatesuggestionDto } from './dto/update-suggestion.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { suggestion } from './domain/suggestion';
import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllsuggestionsDto } from './dto/find-all-suggestions.dto';

@ApiTags('Suggestions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'suggestions',
  version: '1',
})
export class suggestionsController {
  constructor(private readonly suggestionsService: suggestionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: suggestion,
  })
  create(@Body() createsuggestionDto: CreatesuggestionDto) {
    return this.suggestionsService.create(createsuggestionDto);
  }

  // @Get()
  // @ApiOkResponse({
  //   type: InfinityPaginationResponse(suggestion),
  // })
  // async findAll(
  //   @Query() query: FindAllsuggestionsDto,
  // ): Promise<InfinityPaginationResponseDto<suggestion>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.suggestionsService.findAllWithPagination({
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
    type: suggestion,
  })
  findById(@Param('id') id: string) {
    return this.suggestionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: suggestion,
  })
  update(
    @Param('id') id: string,
    @Body() updatesuggestionDto: UpdatesuggestionDto,
  ) {
    return this.suggestionsService.update(id, updatesuggestionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.suggestionsService.remove(id);
  }
}
