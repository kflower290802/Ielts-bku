import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Practice } from './domain/practice';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Practices')
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
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createPracticeDto: CreatePracticeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.practicesService.create({ ...createPracticeDto, image });
  }
}
