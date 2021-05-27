import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

/**
 * Servicio encargado de la gestion de peticiones en vuelo de la apliación para indicar al usuario su ejecución
 */
@Injectable({ providedIn: 'root', useClass: AppDialogService })
export class AppDialogService {

    cachedRequests: Array<HttpRequest<any>> = [];

    private loadingSubject: BehaviorSubject<boolean>;
    public loadingObs: Observable<boolean>;

    constructor(
        private alertCtrl: AlertController
    ) {
        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.loadingObs = this.loadingSubject.asObservable();
    }

    collectRequest(request): void {
        if (this.cachedRequests.length == 0) {
            this.loadingSubject.next(true);
        }
        this.cachedRequests.push(request);
    }

    dropRequest(request): void {
        if (this.cachedRequests.length > 0) {
            this.cachedRequests.pop();
            if (this.cachedRequests.length == 0) {
                this.loadingSubject.next(false);
            }
        }
    }

    async presentErrorAlert(title: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: 'Error',
            subHeader: title,
            message: message,
            buttons: ['Cerrar']
        });
        await alert.present();
    }


    get isPendingRequests() {
        return this.cachedRequests.length > 0;
    }
}
