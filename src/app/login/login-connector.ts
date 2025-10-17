import { Component } from '@angular/core';
import { LoginPage } from './login-page/login-page';
import { LoginPageHeader } from './login-page-header/login-page-header';
import { LoginPageFooter } from './login-page-footer/login-page-footer';


@Component({
  selector: 'app-login-page-connector',
  
  imports: [LoginPage, LoginPageHeader, LoginPageFooter],
  template:'<app-login-page-header></app-login-page-header><app-login-page></app-login-page><app-login-page-footer></app-login-page-footer>',

})
export class LoginPageConnector {
}

