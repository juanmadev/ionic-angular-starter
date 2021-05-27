import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMainPageRoutingModule } from './main.router.module';
import { AppMainPage } from './main.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppMainPageRoutingModule
  ],
  declarations: [AppMainPage]
})
export class AppMainPageModule { }
