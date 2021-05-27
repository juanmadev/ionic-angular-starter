import { Injectable } from '@angular/core';
import { AppCoreService } from 'src/app/@core/services/core.service';
import { Observable } from 'rxjs';
import { AppApiConstants } from 'src/app/commons/constants/api.constants';

/**
 * Servicio encargado de tratar las llamadas a la API
 */
@Injectable(
    { providedIn: 'root', useClass: AppApiService }
)
export class AppApiService {

    constructor(
        private appCoreSrvc: AppCoreService,
    ) {

    }

    getTestRs(txId: string): Observable<any> {
        const epName = AppApiConstants.API_BASE_ENDPOINT;
        return this.appCoreSrvc.getRQ<any>(epName);
    }
}
