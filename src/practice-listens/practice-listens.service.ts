import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePracticeListenDto } from './dto/create-practice-listen.dto';
import { PracticeListenRepository } from './infrastructure/persistence/practice-listen.repository';
import { PracticeListen } from './domain/practice-listen';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Practice } from '../practices/domain/practice';
import { PracticeListenTypesService } from '../practice-listen-types/practice-listen-types.service';

@Injectable()
export class PracticeListensService {
  constructor(
    private readonly practiceListenRepository: PracticeListenRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly practiceListenTypesService: PracticeListenTypesService,
  ) {}

  async create(createPracticeListenDto: CreatePracticeListenDto) {
    const { audio, practiceId } = createPracticeListenDto;
    const { secure_url } = await this.cloudinaryService.uploadAudio(audio);
    const practice = new Practice();
    practice.id = practiceId;
    return this.practiceListenRepository.create({
      audio: secure_url,
      practice,
    });
  }
  findById(id: PracticeListen['id']) {
    return this.practiceListenRepository.findById(id);
  }

  findByIds(ids: PracticeListen['id'][]) {
    return this.practiceListenRepository.findByIds(ids);
  }

  async getPracticeData(id: string, userId: string) {
    console.log(userId);
    const practiceListen =
      await this.practiceListenRepository.findByPracticeId(id);
    if (!practiceListen) throw new NotFoundException('Practice not found');
    const types = await this.practiceListenTypesService.findByPracticeListenId(
      practiceListen.id,
    );
    return { practiceListen, types };
  }
}
