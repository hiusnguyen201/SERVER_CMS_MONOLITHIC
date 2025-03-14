import { FindOptionsSelect, FindOptionsSelectByString, FindOptionsWhere } from 'typeorm';

export type RepositoryOrderCondition = {
  [columnName: string]: 'asc' | 'desc' | 'ASC' | 'DESC';
};

export type RepositoryFindOptions<T> = {
  includeRemoved?: boolean;
  limit?: number;
  offset?: number;
  keyword?: string;
  order?: RepositoryOrderCondition;
  where?: FindOptionsWhere<T>;
  select?: FindOptionsSelect<T>;
  relations?: string[];
};

export type RepositoryRemoveOptions = {
  disableSoftDeleting?: boolean;
};

export type RepositorySearchField<T> = keyof Extract<T, { [key: string]: string }>;
