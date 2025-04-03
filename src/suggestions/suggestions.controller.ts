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
