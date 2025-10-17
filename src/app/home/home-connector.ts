import { Component } from '@angular/core';
import { HomePage } from './home-page/home-page';
import { HomePageHeader } from './home-page-header/home-page-header';
import { HomePageFooter } from './home-page-footer/home-page-footer';


@Component({
  selector: 'app-home-page-connector',
  
  imports: [HomePage, HomePageFooter, HomePageHeader],
  template:'<app-home-page-header></app-home-page-header><app-home-page></app-home-page><app-home-page-footer></app-home-page-footer>',

})
export class HomePageConnector {
}
