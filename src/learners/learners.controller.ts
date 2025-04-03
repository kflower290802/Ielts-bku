import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { learnersService } from './learners.service';
import { CreatelearnerDto } from './dto/create-learner.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { learner } from './domain/learner';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Learners')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'learners',
  version: '1',
})
export class learnersController {
  constructor(private readonly learnersService: learnersService) {}

  @Post()
  @ApiCreatedResponse({
    type: learner,
  })
  create(@Body() createlearnerDto: CreatelearnerDto) {
    return this.learnersService.create(createlearnerDto);
  }
}
