import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
} from '@nestjs/common';
import { PracticeReadingsService } from './practice-readings.service';
import { CreatePracticeReadingDto } from './dto/create-practice-reading.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeReading } from './domain/practice-reading';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePracticeReadingDto } from './dto/update-practice-reading.dto';

@ApiTags('Practicereadings')
@Controller({
  path: 'practice-readings',
  version: '1',
})
export class PracticeReadingsController {
  constructor(
    private readonly practiceReadingsService: PracticeReadingsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeReading,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPracticeReadingDto: CreatePracticeReadingDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.practiceReadingsService.create({
      ...createPracticeReadingDto,
      image,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updatePracticeReadingDto: UpdatePracticeReadingDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.practiceReadingsService.update(id, {
      ...updatePracticeReadingDto,
      image,
    });
  }
}
