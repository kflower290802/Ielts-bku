import { forwardRef, Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { DocumentPracticePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { TopicsModule } from '../topics/topics.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UsersModule } from '../users/users.module';
import { UserPracticesModule } from '../user-practices/user-practices.module';
import { PracticeReadingsModule } from '../practice-readings/practice-readings.module';

@Module({
  imports: [
    DocumentPracticePersistenceModule,
    TopicsModule,
    CloudinaryModule,
    UsersModule,
    UserPracticesModule,
    forwardRef(() => PracticeReadingsModule),
  ],
  controllers: [PracticesController],
  providers: [PracticesService],
  exports: [PracticesService, DocumentPracticePersistenceModule],
})
export class PracticesModule {}
