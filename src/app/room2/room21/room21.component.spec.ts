import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Room21Component } from './room21.component';

describe('Room21Component', () => {
  let component: Room21Component;
  let fixture: ComponentFixture<Room21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Room21Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Room21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
