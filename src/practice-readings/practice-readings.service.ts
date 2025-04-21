import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePracticeReadingDto } from './dto/create-practice-reading.dto';
import { UpdatePracticeReadingDto } from './dto/update-practice-reading.dto';
import { PracticeReadingRepository } from './infrastructure/persistence/practice-reading.repository';
import { PracticeReading } from './domain/practice-reading';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PracticesService } from '../practices/practices.service';
import { PracticeReadingTypesService } from '../practice-reading-types/practice-reading-types.service';
import { QuestionType } from '../utils/types/question.type';
import { UserPracticeReadingAnswersService } from '../user-practice-reading-answers/user-practice-reading-answers.service';
import { UserPracticesService } from '../user-practices/user-practices.service';

@Injectable()
export class PracticeReadingsService {
  constructor(
    private readonly practiceReadingRepository: PracticeReadingRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => PracticesService))
    private readonly practicesService: PracticesService,
    @Inject(forwardRef(() => PracticeReadingTypesService))
    private readonly practiceReadingTypesService: PracticeReadingTypesService,
    private readonly userPracticeReadingAnswersService: UserPracticeReadingAnswersService,
    private readonly userPracticesService: UserPracticesService,
  ) {}

  async create(createPracticeReadingDto: CreatePracticeReadingDto) {
    const { image, practiceId, ...rest } = createPracticeReadingDto;
    const practice = await this.practicesService.findById(practiceId);
    if (!practice) throw new NotFoundException('Practice not found');
    const { secure_url } = await this.cloudinaryService.uploadImage(image);
    return this.practiceReadingRepository.create({
      ...rest,
      practice,
      image: secure_url,
    });
  }

  async getPracticeData(id: string, userId: string) {
    const practiceReading =
      await this.practiceReadingRepository.findByPracticeId(id);
    if (!practiceReading)
      throw new NotFoundException('Practice reading not found');
    const practiceReadingId = practiceReading.id;
    const types =
      await this.practiceReadingTypesService.findByPracticeReadingId(
        practiceReadingId,
      );

    const userPractice =
      await this.userPracticesService.findByPracticeIdAndUserId(id, userId);
    if (!userPractice) throw new NotFoundException('User practice not found');
    const answers =
      await this.userPracticeReadingAnswersService.findByUserPracticeId(
        userPractice.id,
      );

    const typesAnswers = types.map((type) => ({
      ...type,
      questions: type.questions.map((question) => ({
        ...question,
        answer:
          answers.find((answer) => answer.question.id === question.id)
            ?.answer || '',
      })),
    }));
    return { practiceReading, types: typesAnswers };
  }

  async getPracticeDataWithQuestionAndAnswer(id: string) {
    const practiceReading =
      await this.practiceReadingRepository.findByPracticeId(id);
    if (!practiceReading) return {};
    const practiceReadingId = practiceReading.id;
    const types =
      await this.practiceReadingTypesService.findByPracticeReadingId(
        practiceReadingId,
      );
    return {
      ...practiceReading,
      types,
    };
  }

  async isIncludesTypes(id: string, type?: QuestionType) {
    if (!type) return true;
    const practiceReading =
      await this.practiceReadingRepository.findByPracticeId(id);
    if (!practiceReading)
      throw new NotFoundException('Practice reading not found');
    const practiceReadingId = practiceReading.id;
    const types =
      await this.practiceReadingTypesService.findByPracticeReadingId(
        practiceReadingId,
      );
    return types.some((t) => t.type === type);
  }

  findById(id: PracticeReading['id']) {
    return this.practiceReadingRepository.findById(id);
  }

  findByIds(ids: PracticeReading['id'][]) {
    return this.practiceReadingRepository.findByIds(ids);
  }

  async update(
    id: PracticeReading['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeReadingDto: UpdatePracticeReadingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceReadingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PracticeReading['id']) {
    return this.practiceReadingRepository.remove(id);
  }
}
