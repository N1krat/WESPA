import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPageFooter } from './signin-page-footer';

describe('SigninPageFooter', () => {
  let component: SigninPageFooter;
  let fixture: ComponentFixture<SigninPageFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninPageFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninPageFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
