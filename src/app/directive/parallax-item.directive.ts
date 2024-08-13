import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[parallaxItem]',
})
export class ParallaxItemDirective {
  @Input() top: any;
  @Input() left: any;
  @Input() rotate = 30;
  @Input() opacity = 1;
  @Input() inversion = false;
  @Input() movement = 0.025;
  public newX: any;
  public newY: any;
  constructor(private eleRef: ElementRef) { }

  ngOnInit(): void {
    this.eleRef.nativeElement.style.position = 'absolute';
    this.eleRef.nativeElement.style.top = this.top;
    this.eleRef.nativeElement.style.left = this.left;
    this.eleRef.nativeElement.style.transform = `translate(0px, 0px) rotate(${this.rotate}deg)`;
    this.eleRef.nativeElement.style.opacity = this.opacity;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    this.movement = this.movement ? this.movement : 0.025;

    const cursorX = e.pageX;
    const cursorY = e.pageY;

    if (!this.inversion) {
      this.newX = cursorX * this.movement;
      this.newY = cursorY * this.movement;
    } else {
      this.newX = -(cursorX * this.movement);
      this.newY = -(cursorY * this.movement);
    }

    this.eleRef.nativeElement.style.transform = `translate(${this.newX}px, ${this.newY}px) rotate(${this.rotate}deg)`;
  }
}
