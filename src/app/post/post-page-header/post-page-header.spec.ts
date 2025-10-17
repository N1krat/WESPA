import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageHeader } from './post-page-header';

describe('PostPageHeader', () => {
  let component: PostPageHeader;
  let fixture: ComponentFixture<PostPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
