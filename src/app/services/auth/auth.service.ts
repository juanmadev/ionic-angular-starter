import { Injectable } from '@angular/core';
import { AppCoreService } from 'src/app/@core/services/core.service';
import { AppConfigService } from 'src/app/@core/services/config.service';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AppApiConstants } from 'src/app/commons/constants/api.constants';
import { map, catchError } from 'rxjs/operators';
import { AppErrorRS } from 'src/app/models/error-rs/error-rs.model';

/**
 * Servicio encargado de las operaciones de autenticación de usuario
 */
@Injectable({ providedIn: 'root', useClass: AppAuthenticationService })
export class AppAuthenticationService {

    // tslint:disable-next-line: max-line-length
    mockToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsiaWQiOiJ1c2VyLWFkbWludXN0IiwibmFtZSI6ImFkbWluIiwic3VybmFtZSI6InVzdCIsInVzZXJuYW1lIjoiYWRtaW51c3QiLCJlbWFpbCI6ImFkbWludXN0QHVzdC1nbG9iYWwuY29tIiwiZW5hYmxlZCI6dHJ1ZSwiaW5pdERhdGUiOiIyMDE5LTA1LTI3VDAwOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IiQyYiQxMiRRdUtxWXRab1NmM2xUb2hWbEVVc1ZldTc4cFJlN1hCRzNaWVhjUzBERTI4NmdYejlVV29UUyIsImdyb3VwcyI6WyJncm91cC1hZG1pbmlzdHJhdG9ycyJdLCJyaWNoR3JvdXBzIjpbeyJpZCI6Imdyb3VwLWFkbWluaXN0cmF0b3JzIiwibmFtZSI6IkFkbWluaXN0cmF0b3JzIEdyb3VwIiwicm9sZXMiOlt7ImlkIjoicm9sZS1tYW5hZ2VyIiwibmFtZSI6IlJvbGUgTWFuYWdlciIsImZ1bmN0aW9uYWxpdGllcyI6WyJjcmVhdGVSb2xlIiwidXBkYXRlUm9sZSIsImdldFJvbGVCeUlkIiwiZ2V0QWxsUm9sZXMiLCJkZWxldGVSb2xlQnlJZCIsImFkZEZ1bmMyUm9sZSIsImRlbEZ1bmMyUm9sZSJdfSx7ImlkIjoicm9sZS11c2VyLW1hbmFnZXIiLCJuYW1lIjoiVXNlciBNYW5hZ2VyIiwiZnVuY3Rpb25hbGl0aWVzIjpbImNyZWF0ZVVzZXIiLCJ1cGRhdGVVc2VyIiwiZ2V0VXNlckJ5SWQiLCJnZXRVc2VycyIsImRlbGV0ZVVzZXJCeUlkIiwiYWRkR3JvdXAyVXNlciJdfSx7ImlkIjoicm9sZS1ncm91cC1tYW5hZ2VyIiwibmFtZSI6Ikdyb3VwIE1hbmFnZXIiLCJmdW5jdGlvbmFsaXRpZXMiOlsiY3JlYXRlR3JvdXAiLCJ1cGRhdGVHcm91cCIsImdldEdyb3VwQnlJZCIsImdldEFsbEdyb3VwcyIsImRlbGV0ZUdyb3VwQnlJZCJdfSx7ImlkIjoicm9sZS1jYW1wYWlnbi1tYW5hZ2VyIiwibmFtZSI6IkNhbXBhaWduIE1hbmFnZXIiLCJmdW5jdGlvbmFsaXRpZXMiOlsiY3JlYXRlQ2FtcGFpZ24iLCJ1cGRhdGVDYW1wYWlnbiIsImdldENhbXBhaWduQnlJZCIsImdldENhbXBhaWducyIsImRlbGV0ZUNhbXBhaWduQnlJZCJdfSx7ImlkIjoicm9sZS13YWxsZXQtbWFuYWdlciIsIm5hbWUiOiJXYWxsZXQgTWFuYWdlciIsImZ1bmN0aW9uYWxpdGllcyI6WyJjcmVhdGVXYWxsZXQiLCJnZXRXYWxsZXRCeVVzZXJJZCIsImdldFdhbGxldEJhbGFuY2UiLCJkZWxldGVXYWxsZXRCeVVzZXJJZCJdfSx7ImlkIjoicm9sZS1jb3Vwb24tbWFuYWdlciIsIm5hbWUiOiJDb3Vwb24gTWFuYWdlciIsImZ1bmN0aW9uYWxpdGllcyI6WyJjcmVhdGVDb3Vwb25zIiwiZ2V0Q291cG9ucyIsImdldENvdXBvbnNCYXRjaCIsImdldEJhdGNoQnlJZCJdfV19XX0sImlhdCI6MTU3MDcxNzU1NiwiZXhwIjoxNTcwNzE5MzU2fQ.h1D3EK55uG6EEdgdhxDxFCzApwDrlRxmVtk7Od_to7I';

    constructor(
        private appCoreSrvc: AppCoreService,
        private appConfigSrvc: AppConfigService,
        private router: Router,
    ) {

        this.appConfigSrvc.currentUser.subscribe((_data) => {
            if (_data && _data.exp) {

            } else {
                this.router.navigate(['/auth/login']);
            }
        })

    }

    login(username: string, password: string): Observable<any> {
        const body = {};
        const headers = new HttpHeaders({
            username,
            passwd: password,
        });
        this.appConfigSrvc.updateJwtToken(this.mockToken);

        this.router.navigate(['/main']);
        return of({
            data: 'ok'
        })
        // return this.appCoreSrvc.postRQ(AppApiConstants.LOGIN, body, headers)
        //     .pipe(
        //         map((res: any) => {
        //             if (res && res.token) {
        //                 this.appConfigSrvc.updateJwtToken(res.token);
        //                 this.router.navigate(['/main']);
        //                 return res;
        //             } else {
        //                 this.router.navigate(['/auth/login']);
        //                 return res;
        //             }
        //         }),
        //         catchError((err: AppErrorRS) => {
        //             console.error(err);
        //             return throwError(err);
        //         }),
        //         // , finalize(() => this.dialogHandler.handleWait(false))
        //     );
    }

    register(userData: any): Observable<any> {
        const headers = new HttpHeaders({
            username: userData.username,
            passwd: userData.password,
        });
        return this.appCoreSrvc.postRQ(AppApiConstants.REGISTER, userData, headers)
            .pipe(
                map((res: any) => {
                    if (res && res.id) {
                        console.log(res);
                        return res;
                    } else {
                        this.router.navigate(['/auth/register]']);
                        return res;
                    }
                }),
                catchError((err: AppErrorRS) => {
                    console.error(err);
                    return throwError(err);
                })
            )
    }

    logout() {
        this.appConfigSrvc.deleteToken();
    }

}
