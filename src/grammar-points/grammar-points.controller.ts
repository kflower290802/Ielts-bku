import { Controller, Post, Body } from '@nestjs/common';
import { GrammarPointsService } from './grammar-points.service';
import { CreateGrammarPointDto } from './dto/create-grammar-point.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GrammarPoint } from './domain/grammar-point';

@ApiTags('Grammarpoints')
@Controller({
  path: 'grammar-points',
  version: '1',
})
export class GrammarPointsController {
  constructor(private readonly grammarPointsService: GrammarPointsService) {}

  @Post()
  @ApiCreatedResponse({
    type: GrammarPoint,
  })
  create(@Body() createGrammarPointDto: CreateGrammarPointDto) {
    return this.grammarPointsService.create(createGrammarPointDto);
  }
}
