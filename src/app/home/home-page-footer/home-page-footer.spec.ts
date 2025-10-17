import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageFooter } from './home-page-footer';

describe('HomePageFooter', () => {
  let component: HomePageFooter;
  let fixture: ComponentFixture<HomePageFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
