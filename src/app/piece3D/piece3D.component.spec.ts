import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Piece3dComponent } from './piece3D.component';

describe('Piece3dComponent', () => {
  let component: Piece3dComponent;
  let fixture: ComponentFixture<Piece3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Piece3dComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Piece3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
