import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Room22Component } from './room22.component';

describe('Room22Component', () => {
  let component: Room22Component;
  let fixture: ComponentFixture<Room22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Room22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Room22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
