import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamReadingTypeDto } from './dto/create-exam-reading-type.dto';
import { UpdateExamReadingTypeDto } from './dto/update-exam-reading-type.dto';
import { ExamReadingTypeRepository } from './infrastructure/persistence/exam-reading-type.repository';
import { ExamReadingType } from './domain/exam-reading-type';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';
import { ExamPassageQuestionsService } from '../exam-passage-questions/exam-passage-questions.service';
import { ExamPassageAnswersService } from '../exam-passage-answers/exam-passage-answers.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ExamReadingTypesService {
  constructor(
    private readonly examReadingTypeRepository: ExamReadingTypeRepository,
    @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassageService: ExamPassagesService,
    @Inject(forwardRef(() => ExamPassageQuestionsService))
    private readonly examPassageQuestionsService: ExamPassageQuestionsService,
    private readonly examPassageAnswersService: ExamPassageAnswersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createExamReadingTypeDto: CreateExamReadingTypeDto) {
    const { examPassageId, image, ...rest } = createExamReadingTypeDto;
    const examPassage = await this.examPassageService.findById(examPassageId);
    if (!examPassage) throw new NotFoundException('Passage not found');
    if (!image)
      return this.examReadingTypeRepository.create({
        examPassage,
        ...rest,
      });
    const { secure_url } = await this.cloudinaryService.uploadImage(image);
    return this.examReadingTypeRepository.create({
      examPassage,
      image: secure_url,
      ...rest,
    });
  }

  findById(id: ExamReadingType['id']) {
    return this.examReadingTypeRepository.findById(id);
  }

  findByIds(ids: ExamReadingType['id'][]) {
    return this.examReadingTypeRepository.findByIds(ids);
  }

  async update(
    id: ExamReadingType['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamReadingTypeDto: UpdateExamReadingTypeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examReadingTypeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamReadingType['id']) {
    return this.examReadingTypeRepository.remove(id);
  }

  findByPassageId(id: string) {
    return this.examReadingTypeRepository.findByPassageId(id);
  }

  async findByPassageIdWithQuestion(id: string) {
    const types = await this.examReadingTypeRepository.findByPassageId(id);
    const questions = await Promise.all(
      types.map(async (type) => {
        const questions =
          await this.examPassageQuestionsService.findByExamTypeId(type.id);
        const questionWithAnswers = await Promise.all(
          questions.map(async (question) => {
            const answers =
              await this.examPassageAnswersService.findAllByQuestionId(
                question.id,
              );
            return { ...question, answers };
          }),
        );
        return { ...type, questions: questionWithAnswers };
      }),
    );
    return questions;
  }
}
