import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section00Component } from './section00.component';

describe('Section00Component', () => {
  let component: Section00Component;
  let fixture: ComponentFixture<Section00Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section00Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
