import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PracticeRepository } from './infrastructure/persistence/practice.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Practice } from './domain/practice';
import { TopicsService } from '../topics/topics.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PracticesService {
  constructor(
    private readonly practiceRepository: PracticeRepository,
    private readonly topicsService: TopicsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createPracticeDto: CreatePracticeDto) {
    const { topicId, image, ...rest } = createPracticeDto;
    const topic = await this.topicsService.findById(topicId);
    if (!topic) throw new NotFoundException('Topic not found');
    const { secure_url } = await this.cloudinaryService.uploadImage(image);
    return this.practiceRepository.create({
      topic,
      image: secure_url,
      ...rest,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.practiceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Practice['id']) {
    return this.practiceRepository.findById(id);
  }

  findByIds(ids: Practice['id'][]) {
    return this.practiceRepository.findByIds(ids);
  }

  async update(
    id: Practice['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeDto: UpdatePracticeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Practice['id']) {
    return this.practiceRepository.remove(id);
  }
}
