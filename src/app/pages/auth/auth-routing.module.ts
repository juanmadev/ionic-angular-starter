import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthComponent } from './auth.component';
import { AppSecurePageGuard } from 'src/app/services/guards/secure-page.guard';

const routes: Routes = [
  {
    path: '',
    component: AppAuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: '../auth/login/login.module#AppLoginModule',
        canActivate: [AppSecurePageGuard],
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class APPAuthPageRoutingModule { }
