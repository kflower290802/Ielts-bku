import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './infrastructure/persistence/account.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Account } from './domain/account';
import bcrypt from 'bcryptjs';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(createAccountDto: CreateAccountDto) {
    // Do not remove comment below.
    // <creating-property />
    const { username } = createAccountDto;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createAccountDto.password, salt);
    return this.accountRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      username,
      password,
      subscriptions: [],
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.accountRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Account['id']) {
    return this.accountRepository.findById(id);
  }

  findByUsername(username: Account['username']) {
    return this.accountRepository.findByUsername(username);
  }

  findByIds(ids: Account['id'][]) {
    return this.accountRepository.findByIds(ids);
  }

  async update(
    id: Account['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAccountDto: UpdateAccountDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.accountRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Account['id']) {
    return this.accountRepository.remove(id);
  }

  findUserByAccountId(accountId: Account['id']) {
    return this.accountRepository.findByAccountId(accountId);
  }
}
