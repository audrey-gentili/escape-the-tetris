import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Room32Component } from './room32.component';

describe('Room32Component', () => {
  let component: Room32Component;
  let fixture: ComponentFixture<Room32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Room32Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Room32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
