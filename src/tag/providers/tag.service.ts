import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  private logger!: Logger;
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    this.logger = new Logger('TagService');
  }
  public async create(body: CreateTagDto) {
    let tag = this.tagRepository.create(body);
    return this.tagRepository.save(tag);
  }
  public async findByID(id: number) {
    let tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(
        `Tag information couldn't find for the given id:${id}`,
      );
    }
    return tag;
  }
  public async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.tagRepository.find({
      skip: skip,
      take: limit,
    });
  }
  public async deleteByID(id: number) {
    let tag = await this.tagRepository.delete(id);
    return tag;
  }
}
