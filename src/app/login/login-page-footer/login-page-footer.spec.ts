import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageFooter } from './login-page-footer';

describe('LoginPageFooter', () => {
  let component: LoginPageFooter;
  let fixture: ComponentFixture<LoginPageFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
