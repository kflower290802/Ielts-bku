import { Controller, Post, Body } from '@nestjs/common';
import { PracticeListenTypesService } from './practice-listen-types.service';
import { CreatePracticeListenTypeDto } from './dto/create-practice-listen-type.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeListenType } from './domain/practice-listen-type';

@ApiTags('Practicelistentypes')
@Controller({
  path: 'practice-listen-types',
  version: '1',
})
export class PracticeListenTypesController {
  constructor(
    private readonly practiceListenTypesService: PracticeListenTypesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeListenType,
  })
  create(@Body() createPracticeListenTypeDto: CreatePracticeListenTypeDto) {
    return this.practiceListenTypesService.create(createPracticeListenTypeDto);
  }
}
