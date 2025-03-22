import { Injectable } from '@nestjs/common';
import { CreatePracticeListenDto } from './dto/create-practice-listen.dto';
import { UpdatePracticeListenDto } from './dto/update-practice-listen.dto';
import { PracticeListenRepository } from './infrastructure/persistence/practice-listen.repository';
import { PracticeListen } from './domain/practice-listen';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Practice } from '../practices/domain/practice';

@Injectable()
export class PracticeListensService {
  constructor(
    private readonly practiceListenRepository: PracticeListenRepository,
    private readonly cloudinaryService: CloudinaryService,
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

  async update(
    id: PracticeListen['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeListenDto: UpdatePracticeListenDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceListenRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PracticeListen['id']) {
    return this.practiceListenRepository.remove(id);
  }
}
