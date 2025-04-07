import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateBlogGrammarPointDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  grammarPointId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  blogId: string;
}
