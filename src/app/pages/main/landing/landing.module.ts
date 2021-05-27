import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppLandingComponent } from './landing.page';
import { AppLandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppLandingRoutingModule,
  ],
  declarations: [
    AppLandingComponent
  ]
})
export class AppLandingModule { }
