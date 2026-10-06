import { Repository } from 'typeorm';
import { MetaOption } from '../metaoption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MetaOptionsDto } from '../../post/dtos/create-post.dto';
@Injectable()
export class MetaOptionService {
  constructor(
    @InjectRepository(MetaOption) private readonly meta: Repository<MetaOption>,
    private readonly logger: Logger,
  ) {}

  public async createMetaOption(metaOptions: MetaOptionsDto) {
    try {
      let newMetaValue = this.meta.create(metaOptions);
      newMetaValue = await this.meta.save(newMetaValue);
      return newMetaValue;
    } catch (error) {
      this.logger.error(
        `Error while creating a new meta option:${error}`,
        `MetaOptionService`,
      );
      throw new InternalServerErrorException(
        'Error while creating a meta value',
      );
    }
  }
}
