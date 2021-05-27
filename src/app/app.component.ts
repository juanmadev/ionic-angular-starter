import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppDialogService } from './@core/services/dialog.service';
import { AppConstants } from './commons/constants/app.constants';
import { AppAuthenticationService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = AppConstants.APP_MENU_PAGES;
  isLoading: boolean = false;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loader: AppDialogService,
    private navCtrl: NavController,
    private authSrvc: AppAuthenticationService,
  ) {
    this.initializeApp();
    this.loader.loadingObs.subscribe((_data) => {
      setTimeout(() => {
        this.isLoading = _data;
      }, 100);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goTo(url) {
    this.navCtrl.navigateRoot(url, { replaceUrl: true });
  }

  logout() {
    this.authSrvc.logout();
  }

}
