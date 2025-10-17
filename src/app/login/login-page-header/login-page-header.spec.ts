import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageHeader } from './login-page-header';

describe('LoginPageHeader', () => {
  let component: LoginPageHeader;
  let fixture: ComponentFixture<LoginPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
