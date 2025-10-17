import { Component } from '@angular/core';
import { SigninPage } from './signin-page/signin-page';
import { SigninPageHeader } from './signin-page-header/signin-page-header';
import { SigninPageFooter } from './signin-page-footer/signin-page-footer';


@Component({
  selector: 'app-signin-page-connector',
  
  imports: [SigninPage, SigninPageHeader, SigninPageFooter],
  template:'<app-signin-page-header></app-signin-page-header><app-signin-page></app-signin-page><app-signin-page-footer></app-signin-page-footer>',

})
export class SigninPageConnector {
}

