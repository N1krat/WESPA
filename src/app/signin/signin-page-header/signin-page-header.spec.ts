import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPageHeader } from './signin-page-header';

describe('SigninPageHeader', () => {
  let component: SigninPageHeader;
  let fixture: ComponentFixture<SigninPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
