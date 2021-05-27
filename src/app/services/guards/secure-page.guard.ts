import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfigService } from 'src/app/@core/services/config.service';

/**
 * Guard encargado de verificar el logueo del usuario y restringir el acceso a las rutas
 */
@Injectable({ providedIn: 'root' })
export class AppSecurePageGuard implements CanActivate {

    /**
     * @ignore
     */
    constructor(
        private router: Router,
        private configSrvc: AppConfigService,
    ) { }

    /**
     * Verificacion de credenciales y su redireccionamiento a la ruta correspondiente
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: any = this.configSrvc.currentUserValue;
        if (currentUser && currentUser.sub) {
            this.router.navigate(['/main']);
        }
        return true;
    }
}