import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainPage } from './main.page';
import { AppAuthGuard } from 'src/app/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppMainPage,
    children: [
      {
        path: 'landing',
        loadChildren: '../main/landing/landing.module#AppLandingModule',
        canActivate: [AppAuthGuard],
      },
      {
        path: '',
        redirectTo: 'landing',
        // pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/landing',
    // pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppMainPageRoutingModule { }
