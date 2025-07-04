export interface ITaskQueryParams {
  description: string;
  title: string;
  userId: number;
  id?: number;
}

export interface ITaskQuery {
  description: string;
  id: number;
  status: number;
  title: string;
  userId?: number;
  createdAt?: Date;
}
