import { Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import express from 'express';
import { Repository, ObjectLiteral } from 'typeorm';
import { PaginationDto } from '../../common/pagination/dtos/pagination.dto';
import { PaginateInterface } from '../interfaces/paginate.interface';
@Injectable()
export class PaginationService {
  private logger!: Logger;
  constructor(@Inject(REQUEST) private readonly request: express.Request) {
    this.logger = new Logger('PaginationService');
  }
  public async paginateQuery<T extends ObjectLiteral>(
    query: PaginationDto,
    repository: Repository<T>,
  ): Promise<PaginateInterface<T>> {
    let skip = 0;
    if (query && query.page && query.limit) {
      skip = (query.page - 1) * query.limit;
    }

    const result = await repository.find({
      take: query.limit,
      skip: skip,
    });
    const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
    const newURL = new URL(this.request.url, baseURL);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (query.limit ?? 10));
    this.logger.log(
      `${query.page},${totalPages},${(query.page ?? 1) >= totalPages}`,
    );
    const nextPage = (query.page ?? 1) >= totalPages ? false : true;
    const prevPage = (query.page ?? 1) <= 1 ? false : true;
    const finalResponse: PaginateInterface<T> = {
      data: result,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page ?? 1,
        nextPage,
        prevPage,
      },
      links: {
        first: `${newURL.origin}${newURL.pathname}?page=1&limit=${query.limit}`,
        last: `${newURL.origin}${newURL.pathname}?page=${totalPages}&limit=${query.limit}`,
        current: `${newURL.origin}${newURL.pathname}?page=${query.page}&limit=${query.limit}`,
        prev: prevPage
          ? `${newURL.origin}${newURL.pathname}?page=${prevPage ? (query.page || 2) - 1 : query.page}&limit=${query.limit}`
          : '',
        next: nextPage
          ? `${newURL.origin}${newURL.pathname}?page=${nextPage ? (query.page || 1) + 1 : query.page}&limit=${query.limit}`
          : '',
      },
    };
    return finalResponse;
  }
}
