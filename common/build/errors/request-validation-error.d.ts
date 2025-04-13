import { CustomError } from './custom-error';
type ValidationErr = {
    msg: string;
    param: string;
    location: string;
    value?: any;
    type?: string;
    path?: string;
};
export declare class RequestValidationError extends CustomError {
    errors: ValidationErr[];
    statusCode: number;
    constructor(errors: ValidationErr[]);
    serializeErrors(): ({
        message: string;
        field: string | undefined;
    } | {
        message: string;
        field?: undefined;
    })[];
}
export {};
