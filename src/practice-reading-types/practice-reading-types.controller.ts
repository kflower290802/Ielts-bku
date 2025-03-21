import { Controller, Post, Body } from '@nestjs/common';
import { PracticeReadingTypesService } from './practice-reading-types.service';
import { CreatePracticeReadingTypeDto } from './dto/create-practice-reading-type.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeReadingType } from './domain/practice-reading-type';

@ApiTags('Practicereadingtypes')
@Controller({
  path: 'practice-reading-types',
  version: '1',
})
export class PracticeReadingTypesController {
  constructor(
    private readonly practiceReadingTypesService: PracticeReadingTypesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeReadingType,
  })
  create(@Body() createPracticeReadingTypeDto: CreatePracticeReadingTypeDto) {
    return this.practiceReadingTypesService.create(
      createPracticeReadingTypeDto,
    );
  }
}
