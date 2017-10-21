import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {

  public static readonly SET_FILTER = 'set_filter';

  private filters: Map<string, any> = new Map();

  public hasFilter(name: string): boolean {
    return this.filters.has(name);
  }

  public setFilter(name: string, value: any) {
    this.filters.set(name, value);
  }

  public removeFilter(name: string) {
    this.filters.delete(name);
  }

  public getFilters(): {[key: string]: any}[] {
    return Array.from(this.filters);
  }
}