import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AppConfigService } from './config.service';
import { AppApiConstants } from 'src/app/commons/constants/api.constants';
import { AppErrorRS } from 'src/app/models/error-rs/error-rs.model';
import { AppDialogService } from './dialog.service';
/**
 * Servicio encargado de manejar todas las peticiones de la aplicación
 */
@Injectable({ providedIn: 'root', useClass: AppCoreService })
export class AppCoreService {

    constructor(
        private http: HttpClient,
        private configSrvc: AppConfigService,
        private dialogSrvc: AppDialogService,
    ) {
    }

    getRQ<T>(epName, req?, params?): Observable<T> {
        return this.standardRQ<T>('GET', epName, undefined, req, params);
    }

    postRQ<T>(epName, body, req?): Observable<T> {
        return this.standardRQ<T>('POST', epName, body, req);
    }

    deleteRQ<T>(epName, body, req?): Observable<T> {
        return this.standardRQ<T>('DELETE', epName, body, req);
    }

    putRQ<T>(epName, body?, req?, params?): Observable<T> {
        return this.standardRQ<T>('PUT', epName, body, req, params);
    }

    private standardRQ<T>(method: string = 'GET', epName: string, body?: any, requ?: HttpHeaders, params?: HttpParams): Observable<T> {
        const url = `${AppApiConstants.API_BASE_ENDPOINT}${epName}`;
        const req: HttpRequest<any> = new HttpRequest(method, url, body, { headers: requ, params: params });
        return this.http.request(req)
            .pipe(
                map((res: any) => {
                    if (res && res.headers) {
                        console.log(`Respuesta correcta a ${epName}`, res);
                        const resAuthHeader = res.headers.get('authorization');
                        const jwtToken = resAuthHeader && resAuthHeader.replace('Bearer', '').trim();
                        if (jwtToken) {
                            this.configSrvc.updateJwtToken(jwtToken);
                        }
                        return res.body;
                    }
                }),
                catchError((err) => {
                    console.error(err);
                    const errorTitle = `Ha ocurrido un error en la petición: ${epName}`;
                    let errorContent = '';
                    let error: any;
                    if (err.error && err.error.error) {
                        error = new AppErrorRS();
                        error = err.error;
                        errorContent = `${error.error.message} - ${error.error.description}`;
                    } else {
                        error = err.error;
                        errorContent = error;
                    }

                    this.errorHandler(error, errorTitle, errorContent);
                    return throwError(err.error);
                }),
            );
    }

    private errorHandler(error: AppErrorRS, errorTitle: string, errorContent: string) {
        if (error.error && error.error.code) {
            switch (error.error.code) {
                case 401:
                    this.configSrvc.deleteToken();
                    this.dialogSrvc.presentErrorAlert(errorTitle, errorContent);
                    break;

                case 404:

                    break;

                default:
                    this.dialogSrvc.presentErrorAlert(errorTitle, errorContent);
                    break;
            }
        } else {
            this.dialogSrvc.presentErrorAlert(errorTitle, errorContent);
        }
    }
}
