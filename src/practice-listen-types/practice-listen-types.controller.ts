import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { PracticeListenTypesService } from './practice-listen-types.service';
import { CreatePracticeListenTypeDto } from './dto/create-practice-listen-type.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeListenType } from './domain/practice-listen-type';
import { UpdatePracticeListenTypeDto } from './dto/update-practice-listen-type.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePracticeListenTypeDto: UpdatePracticeListenTypeDto,
  ) {
    return this.practiceListenTypesService.update(
      id,
      updatePracticeListenTypeDto,
    );
  }
}
