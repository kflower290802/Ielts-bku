import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePracticeWritingDto } from './dto/create-practice-writing.dto';
import { UpdatePracticeWritingDto } from './dto/update-practice-writing.dto';
import { PracticeWritingRepository } from './infrastructure/persistence/practice-writing.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PracticeWriting } from './domain/practice-writing';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Practice } from '../practices/domain/practice';
import { UserPracticeWritingAnswersService } from '../user-practice-writing-answers/user-practice-writing-answers.service';
import { UserPracticesService } from '../user-practices/user-practices.service';

@Injectable()
export class PracticeWritingsService {
  constructor(
    private readonly practiceWritingRepository: PracticeWritingRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userPracticeWritingAnswersService: UserPracticeWritingAnswersService,
    private readonly userPracticesService: UserPracticesService,
  ) {}

  async create(createPracticeWritingDto: CreatePracticeWritingDto) {
    const { image, practiceId, ...rest } = createPracticeWritingDto;
    const practice = new Practice();
    practice.id = practiceId;
    if (image) {
      const { secure_url } = await this.cloudinaryService.uploadImage(image);
      return this.practiceWritingRepository.create({
        image: secure_url,
        practice,
        ...rest,
      });
    }
    return this.practiceWritingRepository.create({
      practice,
      ...rest,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.practiceWritingRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PracticeWriting['id']) {
    return this.practiceWritingRepository.findById(id);
  }

  findByIds(ids: PracticeWriting['id'][]) {
    return this.practiceWritingRepository.findByIds(ids);
  }

  async update(
    id: PracticeWriting['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeWritingDto: UpdatePracticeWritingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceWritingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PracticeWriting['id']) {
    return this.practiceWritingRepository.remove(id);
  }

  async getPracticeData(id: string, userId: string) {
    const practice = await this.practiceWritingRepository.findByPracticeId(id);
    if (!practice) throw new NotFoundException('Practice not found');
    const userPractice =
      await this.userPracticesService.findByPracticeIdAndUserId(id, userId);
    if (!userPractice) throw new NotFoundException('User practice not found');
    const answer =
      await this.userPracticeWritingAnswersService.findByUserPracticeId(
        userPractice.id,
      );
    return { ...practice, answer };
  }

  async getPracticeDataWithQuestionAndAnswer(id: string) {
    const practice = await this.practiceWritingRepository.findByPracticeId(id);
    if (!practice) throw new NotFoundException('Practice not found');
    return practice;
  }
}
