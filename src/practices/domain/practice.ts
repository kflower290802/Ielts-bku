import { ApiProperty } from '@nestjs/swagger';
import { Topic } from '../../topics/domain/topic';
import { PracticeType } from '../pratices.type';

export class Practice {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  topic: Topic;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  type: PracticeType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isDeleted?: boolean;
}
