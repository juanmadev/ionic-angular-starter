import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLandingComponent } from './landing.page';
import { AppAuthGuard } from 'src/app/services/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AppLandingComponent,
        children: [
            {
                path: 'landing-main',
                loadChildren: '../landing/landing-main/landing-main.module#AppLandingMainModule',
                canActivate: [AppAuthGuard],
            },
            {
                path: '',
                redirectTo: 'landing-main',
                // pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/landing-main',
        // pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AppLandingRoutingModule { }
