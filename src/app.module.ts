import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import googleConfig from './auth-google/config/google.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';
import { AccountsModule } from './accounts/accounts.module';

import { SubscriptionsModule } from './subscriptions/subscriptions.module';

import { HistoriesModule } from './histories/histories.module';

import { ExplainationsModule } from './explainations/explainations.module';

import { ChoicesModule } from './choices/choices.module';

import { BlogsModule } from './blogs/blogs.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

import { FlashCardsModule } from './flash-cards/flash-cards.module';
import { VideosModule } from './videos/videos.module';
import { BlogLessonsModule } from './blog-lessons/blog-lessons.module';
import { ExamsModule } from './exams/exams.module';
import { UserExamsModule } from './user-exams/user-exams.module';
import { ExamPassagesModule } from './exam-passages/exam-passages.module';
import { ExamPassageQuestionsModule } from './exam-passage-questions/exam-passage-questions.module';

import { UserExamSessionsModule } from './user-exam-sessions/user-exam-sessions.module';

import { ExamPassageAnswersModule } from './exam-passage-answers/exam-passage-answers.module';

import { UserExamAnswersModule } from './user-exam-answers/user-exam-answers.module';

import { ExamListenSectionsModule } from './exam-listen-sections/exam-listen-sections.module';

import { ExamListenQuestionsModule } from './exam-listen-questions/exam-listen-questions.module';

import { ExamListenAnswersModule } from './exam-listen-answers/exam-listen-answers.module';

import { UserExamListenAnswersModule } from './user-exam-listen-answers/user-exam-listen-answers.module';

import { ExamSpeaksModule } from './exam-speaks/exam-speaks.module';

import { UserExamSpeakAnswersModule } from './user-exam-speak-answers/user-exam-speak-answers.module';

import { ExamWritingsModule } from './exam-writings/exam-writings.module';

import { UserExamWritingsModule } from './user-exam-writings/user-exam-writings.module';

import { ExamReadingTypesModule } from './exam-reading-types/exam-reading-types.module';

import { ExamListenTypesModule } from './exam-listen-types/exam-listen-types.module';

import { PracticesModule } from './practices/practices.module';

import { TopicsModule } from './topics/topics.module';

import { PracticeReadingsModule } from './practice-readings/practice-readings.module';

import { PracticeReadingTypesModule } from './practice-reading-types/practice-reading-types.module';

import { PracticeReadingQuestionsModule } from './practice-reading-questions/practice-reading-questions.module';

import { PracticeReadingAnswersModule } from './practice-reading-answers/practice-reading-answers.module';

import { UserPracticesModule } from './user-practices/user-practices.module';

import { PracticeListensModule } from './practice-listens/practice-listens.module';

import { PracticeListenTypesModule } from './practice-listen-types/practice-listen-types.module';

import { PracticeListenQuestionsModule } from './practice-listen-questions/practice-listen-questions.module';

import { PracticeListenAnswersModule } from './practice-listen-answers/practice-listen-answers.module';

import { PracticeWritingsModule } from './practice-writings/practice-writings.module';

import { PracticeSpeakingQuestionsModule } from './practice-speaking-questions/practice-speaking-questions.module';

import { UserPracticeReadingAnswersModule } from './user-practice-reading-answers/user-practice-reading-answers.module';

import { UserPracticeListenAnswersModule } from './user-practice-listen-answers/user-practice-listen-answers.module';

import { UserPracticeWritingAnswersModule } from './user-practice-writing-answers/user-practice-writing-answers.module';

import { UserPracticeSpeakAnswersModule } from './user-practice-speak-answers/user-practice-speak-answers.module';

import { UserPracticeSessionsModule } from './user-practice-sessions/user-practice-sessions.module';

import { ExamSpeakQuestionsModule } from './exam-speak-questions/exam-speak-questions.module';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

import { ExamSpeakPartsModule } from './exam-speak-parts/exam-speak-parts.module';

@Module({
  imports: [
    ExamSpeakPartsModule,
    ExamSpeakQuestionsModule,
    UserPracticeSessionsModule,
    UserPracticeSpeakAnswersModule,
    UserPracticeWritingAnswersModule,
    UserPracticeListenAnswersModule,
    UserPracticeReadingAnswersModule,
    PracticeSpeakingQuestionsModule,
    PracticeWritingsModule,
    PracticeListenAnswersModule,
    PracticeListenQuestionsModule,
    PracticeListenTypesModule,
    PracticeListensModule,
    UserPracticesModule,
    PracticeReadingAnswersModule,
    PracticeReadingQuestionsModule,
    PracticeReadingTypesModule,
    PracticeReadingsModule,
    PracticesModule,
    TopicsModule,
    ExamListenTypesModule,
    ExamReadingTypesModule,
    UserExamWritingsModule,
    ExamWritingsModule,
    UserExamSpeakAnswersModule,
    ExamSpeaksModule,
    UserExamListenAnswersModule,
    ExamListenAnswersModule,
    ExamListenQuestionsModule,
    ExamListenSectionsModule,
    UserExamAnswersModule,
    ExamPassageAnswersModule,
    UserExamAnswersModule,
    UserExamSessionsModule,
    ExamPassageQuestionsModule,
    ExamPassagesModule,
    UserExamsModule,
    ExamsModule,
    BlogLessonsModule,
    FlashCardsModule,
    VideosModule,
    CloudinaryModule,
    BlogsModule,
    ChoicesModule,
    ExplainationsModule,
    HistoriesModule,
    SubscriptionsModule,
    AccountsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, googleConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AuthGoogleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
