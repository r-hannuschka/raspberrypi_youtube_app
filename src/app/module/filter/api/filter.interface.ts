export interface IFilter {

    isActive(): boolean;

    getName(): string;

    getLabel(): string;

    getValue(): any;

    getType(): string;

    setActive(active: boolean);

    setValue(value: any);
}
