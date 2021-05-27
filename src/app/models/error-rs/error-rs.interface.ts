export interface AppErrorRSInterface {
    error: AppErrorObjRSInterface;
}

export interface AppErrorObjRSInterface {
    code: number;
    message: string;
    description: string;
}
