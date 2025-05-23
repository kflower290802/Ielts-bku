import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { UserPracticesService } from './user-practices.service';
import { CreateUserPracticeDto } from './dto/create-user-practice.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserPractice } from './domain/user-practice';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userpractices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-practices',
  version: '1',
})
export class UserPracticesController {
  constructor(private readonly userPracticesService: UserPracticesService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserPractice,
  })
  create(@Body() createUserPracticeDto: CreateUserPracticeDto) {
    return this.userPracticesService.create(createUserPracticeDto);
  }

  @Get('recent-practices')
  @ApiOkResponse({
    type: UserPractice,
  })
  getUserPractices(@Request() request) {
    const userId = request.user.id;
    return this.userPracticesService.getUserPracticeByUserIdWithPagination(
      userId,
    );
  }
}
