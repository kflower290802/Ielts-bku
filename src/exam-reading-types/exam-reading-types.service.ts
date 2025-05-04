import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamReadingTypeDto } from './dto/create-exam-reading-type.dto';
import { ExamReadingTypeRepository } from './infrastructure/persistence/exam-reading-type.repository';
import { ExamReadingType } from './domain/exam-reading-type';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';
import { ExamPassageQuestionsService } from '../exam-passage-questions/exam-passage-questions.service';
import { ExamPassageAnswersService } from '../exam-passage-answers/exam-passage-answers.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../users/domain/user';
import { UserExamAnswersService } from '../user-exam-answers/user-exam-answers.service';
import { UpdateExamReadingTypeDto } from './dto/update-exam-reading-type.dto';
@Injectable()
export class ExamReadingTypesService {
  constructor(
    private readonly examReadingTypeRepository: ExamReadingTypeRepository,
    @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassageService: ExamPassagesService,
    private readonly examPassageQuestionsService: ExamPassageQuestionsService,
    private readonly examPassageAnswersService: ExamPassageAnswersService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userExamAnswersService: UserExamAnswersService,
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

  remove(id: ExamReadingType['id']) {
    return this.examReadingTypeRepository.remove(id);
  }

  async update(
    id: ExamReadingType['id'],
    updateExamReadingTypeDto: UpdateExamReadingTypeDto,
  ) {
    const { image, ...rest } = updateExamReadingTypeDto;
    if (image) {
      const { secure_url } = await this.cloudinaryService.uploadImage(image);
      return this.examReadingTypeRepository.update(id, {
        ...rest,
        image: secure_url,
      });
    }
    return this.examReadingTypeRepository.update(id, rest);
  }

  findByPassageId(id: string) {
    return this.examReadingTypeRepository.findByPassageId(id);
  }

  async findByPassageIdWithQuestion(
    id: string,
    userId: User['id'],
    examId: string,
  ) {
    const types = await this.examReadingTypeRepository.findByPassageId(id);
    const userExamAnswers =
      await this.userExamAnswersService.findByUserIdAndExamId(userId, examId);
    return Promise.all(
      types.map(async (type) => {
        const questions =
          await this.examPassageQuestionsService.findByExamTypeId(type.id);
        const questionWithAnswers = await Promise.all(
          questions.map(async (question) => {
            const answers =
              await this.examPassageAnswersService.findAllByQuestionId(
                question.id,
              );
            const answer = userExamAnswers.find(
              (answer) => answer.examPassageQuestion.id === question.id,
            );
            return { ...question, answers, answer };
          }),
        );
        return { ...type, questions: questionWithAnswers };
      }),
    );
  }

  async findByPassageIdWithQuestionAndAnswer(id: string) {
    const types = await this.examReadingTypeRepository.findByPassageId(id);
    return Promise.all(
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
  }
}
