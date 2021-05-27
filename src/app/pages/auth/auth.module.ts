import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APPAuthPageRoutingModule } from './auth-routing.module';
import { AppAuthComponent } from './auth.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    APPAuthPageRoutingModule,
  ],
  declarations: [AppAuthComponent]
})
export class AppAuthModule { }
