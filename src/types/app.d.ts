
declare interface ReduxAction<T = any> {
    type: string,
    data: T
}

declare type Partial<T> = {
    [P in keyof T]?: T[P];
}