export interface ResponseWrapper<T> {
    code: number;
    status: Status;
    message: string;
    result: T;
    error: string;
}

export enum Status {
    SUCCESS = "Success",
    FAILURE = "Failure"
}

export function getSuccess<T>(result: T): ResponseWrapper<T> {
    return {
        code: 200,
        status: Status.SUCCESS,
        result
    } as ResponseWrapper<T>;
}

export function getFailure<T>(code: number, e: any): ResponseWrapper<T> {
    return {
        code,
        status: Status.FAILURE,
        error: e
    } as ResponseWrapper<T>;
}