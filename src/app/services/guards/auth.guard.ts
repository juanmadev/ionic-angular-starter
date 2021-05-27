import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfigService } from 'src/app/@core/services/config.service';

/**
 * Guard encargado de verificar el logueo del usuario y restringir el acceso a las rutas
 */
@Injectable({ providedIn: 'root' })
export class AppAuthGuard implements CanActivate {

    /**
     * @ignore
     */
    constructor(
        private router: Router,
        private configSrvc: AppConfigService,
    ) { }

    /**
     * Verificacion de la ausencia credenciales y su redireccionamiento a la ruta correspondiente
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser: any = this.configSrvc.currentUserValue;
        if (currentUser && currentUser.sub) {
            return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
    }
}