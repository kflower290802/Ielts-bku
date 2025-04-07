import { Controller, Post, Body, Get } from '@nestjs/common';
import { GrammarPointsService } from './grammar-points.service';
import { CreateGrammarPointDto } from './dto/create-grammar-point.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @Get()
  @ApiOkResponse({
    type: [GrammarPoint],
  })
  findAll() {
    return this.grammarPointsService.findAll();
  }
}
