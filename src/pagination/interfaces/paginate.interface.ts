export interface PaginateInterface<T> {
  data: T[];
  meta: {
    totalPages: number;
    totalItems: number;
    nextPage: boolean;
    currentPage: number;
    prevPage: boolean;
  };
  links: {
    first: string;
    last: string;
    current: string;
    prev: string;
    next: string;
  };
}
