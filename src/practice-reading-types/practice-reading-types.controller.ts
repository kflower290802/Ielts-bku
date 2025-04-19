import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PracticeReadingTypesService } from './practice-reading-types.service';
import { CreatePracticeReadingTypeDto } from './dto/create-practice-reading-type.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeReadingType } from './domain/practice-reading-type';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPracticeReadingTypeDto: CreatePracticeReadingTypeDto,
    @UploadedFile()
    image?: Express.Multer.File,
  ) {
    return this.practiceReadingTypesService.create({
      ...createPracticeReadingTypeDto,
      image,
    });
  }
}
