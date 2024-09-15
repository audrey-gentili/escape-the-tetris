import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Room3Component } from './room3.component';

describe('Room3Component', () => {
  let component: Room3Component;
  let fixture: ComponentFixture<Room3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Room3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Room3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
