import { IOption } from './../api/option.interface';
import { Filter } from './filter.model';

export class SelectFilterModel extends Filter {

    private options: IOption[];

    /**
     *
     *
     * @param {IOption[]} options
     * @memberof SelectFilterModel
     */
    public setOptions(options: IOption[]) {
        this.options = options;
    }

    /**
     * get select box options
     *
     * @returns {IOption[]}
     * @memberof SelectFilterModel
     */
    public getOptions(): IOption[] {
        return this.options;
    }

    /**
     *
     *
     * @returns {string} 
     * @memberof SelectFilterModel
     */
    public getType(): string {
        return Filter.FILTER_SELECT;
    }
}