import {
    AppTokenRSInterface, AppTokenSubRSInterface,
    AppTokenGroupRSInterface, AppTokenRoleRSInterface,
} from './token-rs.interface';

export class AppTokenRS implements AppTokenRSInterface {
    sub: AppTokenSubRS;
    iat: number;
    exp: number;
    constructor() {
        this.sub = new AppTokenSubRS();
    }
}

export class AppTokenSubRS implements AppTokenSubRSInterface {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    enabled: boolean;
    groups: AppTokenGroupRS[];
    constructor() {
        this.groups = new Array<AppTokenGroupRS>();
    }
}

export class AppTokenGroupRS implements AppTokenGroupRSInterface {
    id: string;
    name: string;
    roles: AppTokenRoleRS[];
    constructor() {
        this.roles = new Array<AppTokenRoleRS>();
    }
}

export class AppTokenRoleRS implements AppTokenRoleRSInterface {
    id: string;
    name: string;
    functionalities: string[];
}
