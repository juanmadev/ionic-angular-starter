
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from '../../commons/constants/app.constants';
import * as jwt_decode from 'jwt-decode';
import { AppTokenRS } from 'src/app/models/token-rs/token-rs.model';
/**
 * Servicio encargado de la gestion y tratamiento de la información de la sesión del usuario actual
 */
@Injectable({ providedIn: 'root', useClass: AppConfigService })
export class AppConfigService {

    private currentUserSubject: BehaviorSubject<AppTokenRS>;
    public currentUser: Observable<AppTokenRS>;

    private currentTokenSubject: BehaviorSubject<string>;
    public currentToken: Observable<string>;

    constructor() {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(AppConstants.SESSION_USER)));
        this.currentTokenSubject = new BehaviorSubject<string>(undefined);
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    updateJwtToken(token: string) {
        this.currentTokenSubject.next(token);
        const info: AppTokenRS = this.getDecodedAccessToken(token);
        console.log(info);
        this.currentUserSubject.next(info);
    }

    deleteToken() {
        this.currentUserSubject.next(undefined);
        this.currentTokenSubject.next(undefined);
    }

    get currentTokenValue(): string {
        return this.currentTokenSubject.value;
    }

    get currentUserValue(): AppTokenRS {
        return this.currentUserSubject.value;
    }

    private getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

}
