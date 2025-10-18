import { Component } from '@angular/core';
import { NewsPage } from './news-page/news-page';
import { NewsPageHeader } from './news-page-header/news-page-header';
import { NewsPageFooter } from './news-page-footer/news-page-footer';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-news-page-connector',
  
  imports: [NewsPage, NewsPageFooter, NewsPageHeader],
  template:'<app-news-page-header></app-news-page-header><app-news-page></app-news-page><app-news-page-footer></app-news-page-footer>',

})
export class NewsPageConnector {
}

