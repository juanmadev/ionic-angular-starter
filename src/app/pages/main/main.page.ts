import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class AppMainPage {

  constructor(
    private menuCtrl: MenuController
  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
