import { Injectable } from '@nestjs/common';
import { CreateGrammarPointDto } from './dto/create-grammar-point.dto';
import { UpdateGrammarPointDto } from './dto/update-grammar-point.dto';
import { GrammarPointRepository } from './infrastructure/persistence/grammar-point.repository';
import { GrammarPoint } from './domain/grammar-point';

@Injectable()
export class GrammarPointsService {
  constructor(
    private readonly grammarPointRepository: GrammarPointRepository,
  ) {}

  async create(createGrammarPointDto: CreateGrammarPointDto) {
    return this.grammarPointRepository.create(createGrammarPointDto);
  }

  findById(id: GrammarPoint['id']) {
    return this.grammarPointRepository.findById(id);
  }

  findByIds(ids: GrammarPoint['id'][]) {
    return this.grammarPointRepository.findByIds(ids);
  }

  async update(
    id: GrammarPoint['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateGrammarPointDto: UpdateGrammarPointDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.grammarPointRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: GrammarPoint['id']) {
    return this.grammarPointRepository.remove(id);
  }
}
