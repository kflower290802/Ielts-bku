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
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class PracticeWritingsService {
  private openai: OpenAI;
  constructor(
    private readonly practiceWritingRepository: PracticeWritingRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userPracticeWritingAnswersService: UserPracticeWritingAnswersService,
    private readonly userPracticesService: UserPracticesService,
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
  async create(createPracticeWritingDto: CreatePracticeWritingDto) {
    const { image, practiceId, ...rest } = createPracticeWritingDto;
    const practice = new Practice();
    practice.id = practiceId;
    if (image) {
      const { secure_url } = await this.cloudinaryService.uploadImage(image);
      const base64Image = image.buffer.toString('base64');
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze the image and provide a detailed description of the image.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      });
      return this.practiceWritingRepository.create({
        image: secure_url,
        imageDetails: response.choices[0].message.content || undefined,
        practice,
        ...rest,
      });
    }
    return this.practiceWritingRepository.create({
      practice,
      ...rest,
    });
  }

  async update(
    id: PracticeWriting['id'],
    updatePracticeWritingDto: UpdatePracticeWritingDto,
  ) {
    const { image, ...rest } = updatePracticeWritingDto;
    const update = { ...rest } as Partial<PracticeWriting>;
    if (image) {
      const { secure_url } = await this.cloudinaryService.uploadImage(image);
      const base64Image = image.buffer.toString('base64');
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze the image and provide a detailed description of the image.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      });
      update.image = secure_url;
      update.imageDetails = response.choices[0].message.content || undefined;
    }
    return this.practiceWritingRepository.update(id, update);
  }

  findByPracticeId(practiceId: Practice['id']) {
    return this.practiceWritingRepository.findByPracticeId(practiceId);
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
    if (!practice) return {};
    return practice;
  }
}
