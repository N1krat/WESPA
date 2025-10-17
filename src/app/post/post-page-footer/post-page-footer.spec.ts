import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageFooter } from './post-page-footer';

describe('PostPageFooter', () => {
  let component: PostPageFooter;
  let fixture: ComponentFixture<PostPageFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPageFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPageFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
