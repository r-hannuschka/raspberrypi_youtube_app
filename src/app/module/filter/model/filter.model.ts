import {IFilter} from '../api/filter.interface';

export abstract class Filter implements IFilter {

    public static readonly FILTER_SELECT = 'select';

    private label: string;

    private name: string;

    private value: string | number;

    private active: boolean;

    public setName(name: string) {
        this.name = name;
    }

    public setValue(value: string | number) {
        this.value = value;
    }

    public setLabel(label: string) {
        this.label = label;
    }

    public setActive(active: boolean) {
        this.active = active;
    }

    public isActive(): boolean {
        return this.active;
    }

    public getType(): string {
        return '';
    }

    public getName(): string {
        return this.name;
    }

    public getLabel(): string {
        return this.label;
    }

    public getValue(): string | number {
        return this.value;
    }
}