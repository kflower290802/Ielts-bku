import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Practice } from './domain/practice';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Practices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'practices',
  version: '1',
})
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Practice,
  })
  create(@Body() createPracticeDto: CreatePracticeDto) {
    return this.practicesService.create(createPracticeDto);
  }
}
