export interface GetEntityListPort {
  page: number;
  limit: number;
  keyword: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc' | 'ASC' | 'DESC';
}
