export interface AppTokenRSInterface {
    sub: AppTokenSubRSInterface;
    iat: number;
    exp: number;
}

export interface AppTokenSubRSInterface {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    enabled: boolean;
    groups: AppTokenGroupRSInterface[];
}

export interface AppTokenGroupRSInterface {
    id: string;
    name: string;
    roles: AppTokenRoleRSInterface[];
}

export interface AppTokenRoleRSInterface {
    id: string;
    name: string;
    functionalities: string[];
}
