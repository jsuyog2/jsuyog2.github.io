import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxScreenComponent } from './parallax-screen.component';

describe('ParallaxScreenComponent', () => {
  let component: ParallaxScreenComponent;
  let fixture: ComponentFixture<ParallaxScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParallaxScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallaxScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
