import { IFilter } from '../api/filter.interface';
import { IOption } from '../api/option.interface';
import { SelectFilterModel } from '../model/select-filter.model';

export class FilterFactory {

    private static instance: FilterFactory = new FilterFactory();

    public constructor() {

        if (FilterFactory.instance) {
            throw new Error('use FilterFactory.getInstance');
        }

        FilterFactory.instance = this;
    }

    public static getInstance(): FilterFactory {
        return FilterFactory.instance;
    }

    public createSelectFilter(name: string, label: string, options: IOption[]): IFilter {
        const filter: SelectFilterModel = new SelectFilterModel();
        filter.setName(name);
        filter.setLabel(label);
        filter.setOptions(options);
        return filter;
    }
}