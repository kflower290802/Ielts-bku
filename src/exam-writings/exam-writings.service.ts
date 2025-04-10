import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import { UpdateExamWritingDto } from './dto/update-exam-writing.dto';
import { ExamWritingRepository } from './infrastructure/persistence/exam-writing.repository';
import { ExamWriting } from './domain/exam-writing';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Exam } from '../exams/domain/exam';
import { User } from '../users/domain/user';
import { UserExamWritingsService } from '../user-exam-writings/user-exam-writings.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ExamWritingsService {
  private openai: OpenAI;
  constructor(
    private readonly examWritingRepository: ExamWritingRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userExamWritingService: UserExamWritingsService,
    private configService: ConfigService,
  ) {
    const openaiApiKey = this.configService.get('app.openaiApiKey', {
      infer: true,
    });
    if (!openaiApiKey) {
      throw new Error('OpenAI API key is not set');
    }
    this.openai = new OpenAI({
      apiKey: openaiApiKey,
    });
  }

  async create(createExamWritingDto: CreateExamWritingDto) {
    const { content, examId, image } = createExamWritingDto;
    const exam = new Exam();
    exam.id = examId;
    if (!image) {
      return this.examWritingRepository.create({ exam, content });
    }
    const { secure_url } = await this.cloudinaryService.uploadImage(image);
    return this.examWritingRepository.create({
      exam,
      content,
      image: secure_url,
    });
  }

  findById(id: ExamWriting['id']) {
    return this.examWritingRepository.findById(id);
  }

  findByIds(ids: ExamWriting['id'][]) {
    return this.examWritingRepository.findByIds(ids);
  }

  async update(
    id: ExamWriting['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamWritingDto: UpdateExamWritingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examWritingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamWriting['id']) {
    return this.examWritingRepository.remove(id);
  }

  findByExamId(id: string) {
    return this.examWritingRepository.findByExamId(id);
  }

  async findAllByExamId(id: string, userId: User['id']) {
    const examWriting = await this.examWritingRepository.findByExamId(id);
    const answers = await this.userExamWritingService.findByUserIdAndExamId(
      userId,
      id,
    );
    return examWriting.map((examWriting) => {
      const answer = answers.find(
        (answer) => answer.examWriting.id === examWriting.id,
      );
      return { ...examWriting, answer };
    });
  }

  async gradeEssay(essay: string) {
    const prompt = `
    You are an IELTS writing examiner. Please grade the following IELTS Writing Task 2 essay.
    Give a band score (0-9) and explain your reasoning based on the four criteria:
    1. Task Response
    2. Coherence and Cohesion
    3. Lexical Resource
    4. Grammatical Range and Accuracy.
    Finally, provide suggestions for improvement.
    
    Here is the essay:
    """
    ${essay}
    """
    `;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
}
