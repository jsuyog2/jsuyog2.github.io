import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section04Component } from './section04.component';

describe('Section04Component', () => {
  let component: Section04Component;
  let fixture: ComponentFixture<Section04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section04Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
