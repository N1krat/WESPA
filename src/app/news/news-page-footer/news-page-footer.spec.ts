import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPageFooter } from './news-page-footer';

describe('NewsPageFooter', () => {
  let component: NewsPageFooter;
  let fixture: ComponentFixture<NewsPageFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPageFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPageFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
