import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCouloirComponent } from './code-couloir.component';

describe('CodeCouloirComponent', () => {
  let component: CodeCouloirComponent;
  let fixture: ComponentFixture<CodeCouloirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeCouloirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeCouloirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
