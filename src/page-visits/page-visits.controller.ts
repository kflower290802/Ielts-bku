import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PageVisitsService } from './page-visits.service';
import { CreatePageVisitDto } from './dto/create-page-visit.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageVisit } from './domain/page-visit';
@ApiTags('Pagevisits')
@Controller({
  path: 'page-visits',
  version: '1',
})
export class PageVisitsController {
  constructor(private readonly pageVisitsService: PageVisitsService) {}

  @Post()
  @ApiCreatedResponse({
    type: PageVisit,
  })
  create(@Body() createPageVisitDto: CreatePageVisitDto) {
    return this.pageVisitsService.create(createPageVisitDto);
  }

  @Get('daily-visits')
  @ApiQuery({
    name: 'startDate',
    type: Date,
    required: true,
  })
  @ApiQuery({
    name: 'endDate',
    type: Date,
    required: true,
  })
  getDailyVisits(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.pageVisitsService.getDailyVisits(startDate, endDate);
  }
}
