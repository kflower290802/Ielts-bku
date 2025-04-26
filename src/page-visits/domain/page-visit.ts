import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class PageVisit {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  url?: string;

  @ApiProperty()
  user?: User;

  @ApiProperty()
  deviceType?: string;

  @ApiProperty()
  browser?: string;

  @ApiProperty()
  os?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
