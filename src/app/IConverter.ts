export interface IConverter<T> {
    convert(item: any): T;
}