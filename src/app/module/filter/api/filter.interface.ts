export interface IFilter {

    isActive(): boolean;

    getName(): string;

    getLabel(): string;

    getValue(): any;

    getType(): string;

    reset(): void;

    setActive(active: boolean);

    setValue(value: any);
}
