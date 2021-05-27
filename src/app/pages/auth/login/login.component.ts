
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppAuthenticationService } from 'src/app/services/auth/auth.service';
import { MenuController } from '@ionic/angular';
import { AppConfigService } from 'src/app/@core/services/config.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class AppLoginComponent implements OnInit {

  form: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private menuCtrl: MenuController,
    private loginSrvc: AppAuthenticationService,
    private configSrvc: AppConfigService,
  ) {
  }

  createFormControls() {
    this.email = new FormControl({ value: '', disabled: false }, Validators.required);
    this.password = new FormControl({ value: '', disabled: false }, Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  clearForm() {
    this.form.reset();
  }

  initForm() {
    this.createFormControls();
    this.createForm();
  }

  login(): void {
    const tempBody = {
      email: this.email.value,
      password: this.password.value,
    };
    this.loginSrvc.login(tempBody.email, tempBody.password)
      .subscribe((_data) => {
        console.log('Login correcto:', _data);
        const user = this.configSrvc.currentUserValue;
        // if (user && user.sub && user.sub.id) {
        //   this.loginSrvc.getUserWallet(user.sub.id).subscribe((_data) => {
        //     console.log('Wallet recuperado: ', _data);
        //   });
        // }
      });
  }

  get isFormValid() {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.initForm();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
