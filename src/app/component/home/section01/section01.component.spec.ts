import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section01Component } from './section01.component';

describe('Section01Component', () => {
  let component: Section01Component;
  let fixture: ComponentFixture<Section01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section01Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
