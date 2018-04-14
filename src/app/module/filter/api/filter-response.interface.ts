import { IFilter } from './filter.interface';

export interface IFilterResponse {

  action: string;

  filters: IFilter[];
}
