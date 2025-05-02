import { Injectable } from '@nestjs/common';
import { CreatePageVisitDto } from './dto/create-page-visit.dto';
import { UpdatePageVisitDto } from './dto/update-page-visit.dto';
import { PageVisitRepository } from './infrastructure/persistence/page-visit.repository';
import { PageVisit } from './domain/page-visit';
import { User } from '../users/domain/user';

@Injectable()
export class PageVisitsService {
  constructor(private readonly pageVisitRepository: PageVisitRepository) {}

  async create(createPageVisitDto: CreatePageVisitDto) {
    const { userId, ...rest } = createPageVisitDto;
    if (!userId) {
      return this.pageVisitRepository.create({ ...rest });
    }
    const user = new User();
    user.id = userId;
    return this.pageVisitRepository.create({ ...rest, user });
  }

  findById(id: PageVisit['id']) {
    return this.pageVisitRepository.findById(id);
  }

  findByIds(ids: PageVisit['id'][]) {
    return this.pageVisitRepository.findByIds(ids);
  }

  async update(
    id: PageVisit['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePageVisitDto: UpdatePageVisitDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.pageVisitRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PageVisit['id']) {
    return this.pageVisitRepository.remove(id);
  }

  getDailyVisits(startDate: Date, endDate: Date) {
    return this.pageVisitRepository.getDailyUserVisits(
      new Date(startDate),
      new Date(endDate),
    );
  }
}
