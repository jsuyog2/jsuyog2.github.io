import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section06Component } from './section06.component';

describe('Section06Component', () => {
  let component: Section06Component;
  let fixture: ComponentFixture<Section06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section06Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
