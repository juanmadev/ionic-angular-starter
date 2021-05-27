import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/@core/services/config.service';
import { map, finalize } from 'rxjs/operators';
import { AppDialogService } from 'src/app/@core/services/dialog.service';

/**
 * @ignore
 */
@Injectable()
/**
 * Interceptor que se encarga de introducir el token en las peticiones y
 * llevar el conteo de las peticiones realizadas
 */
export class AppJwtInterceptor implements HttpInterceptor {

    /**
     * @ignore
     */
    constructor(
        private configSrvc: AppConfigService,
        private dialogSrvc: AppDialogService,
    ) { }

    /**
     * @param request petición realizada
     * @param next mapeador de peticiones
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.dialogSrvc.collectRequest(request);
        const token = this.configSrvc.currentTokenValue;
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        console.log('Entrando en el interceptor AppJwtInterceptor', request);
        return next.handle(request)
            .pipe(
                map(resp => {
                    if (resp instanceof HttpResponse || resp instanceof HttpErrorResponse) {
                        return resp;
                    }
                }),
                finalize(() => {
                    this.dialogSrvc.dropRequest(request);
                })
            );
    }
}
