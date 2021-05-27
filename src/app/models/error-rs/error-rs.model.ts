import { AppErrorRSInterface, AppErrorObjRSInterface } from './error-rs.interface';

export class AppErrorRS implements AppErrorRSInterface {
    error: AppErrorObjRS;
    constructor() {
        this.error = new AppErrorObjRS();
    }
}

export class AppErrorObjRS implements AppErrorObjRSInterface {
    code: number;
    message: string;
    description: string;
}
