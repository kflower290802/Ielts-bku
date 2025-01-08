import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import {
  StatusEnum,
  UserSchemaClass,
} from '../../../../users/infrastructure/persistence/document/entities/user.schema';
import { RoleEnum } from '../../../../accounts/infrastructure/persistence/document/entities/account.schema';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserSchemaClass>,
  ) {}

  async run() {
    const admin = await this.model.findOne({
      email: 'admin@example.com',
    });

    if (!admin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      const data = new this.model({
        email: 'admin@example.com',
        password,
        name: 'Super',
        address: '123 Main St, Springfield, USA',
        role: RoleEnum.Learner,
        status: StatusEnum.Active,
      });
      await data.save();
    }

    const user = await this.model.findOne({
      email: 'john.doe@example.com',
    });

    if (!user) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      const data = new this.model({
        email: 'john.doe@example.com',
        password,
        name: 'John',
        address: '123 Main St, Springfield, USA',
        role: RoleEnum.Learner,
        status: StatusEnum.Active,
      });

      await data.save();
    }
  }
}
