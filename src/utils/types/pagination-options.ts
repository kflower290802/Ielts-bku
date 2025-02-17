export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationResponse extends IPaginationOptions {
  total: number;
}
