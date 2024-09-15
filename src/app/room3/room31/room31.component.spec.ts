import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Room31Component } from './room31.component';

describe('Room31Component', () => {
  let component: Room31Component;
  let fixture: ComponentFixture<Room31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Room31Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Room31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
