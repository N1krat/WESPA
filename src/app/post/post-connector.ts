import { Component } from '@angular/core';
import { PostPage } from './post-page/post-page';
import { PostPageHeader } from './post-page-header/post-page-header';
import { PostPageFooter } from './post-page-footer/post-page-footer';


@Component({
  selector: 'app-post-page-connector',
  
  imports: [PostPage, PostPageHeader, PostPageFooter],
  template:'<app-post-page-header></app-post-page-header><app-post-page></app-post-page><app-post-page-footer></app-post-page-footer>',

})
export class PostPageConnector {
}

