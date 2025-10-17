import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPageHeader } from './news-page-header';

describe('NewsPageHeader', () => {
  let component: NewsPageHeader;
  let fixture: ComponentFixture<NewsPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
