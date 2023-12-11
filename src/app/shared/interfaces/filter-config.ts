export interface FilterConfig {
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  filterBy: string;
}
