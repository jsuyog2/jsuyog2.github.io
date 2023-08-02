import { Component } from '@angular/core';

@Component({
  selector: 'app-parallax-screen',
  templateUrl: './parallax-screen.component.html',
  styleUrls: ['./parallax-screen.component.scss']
})
export class ParallaxScreenComponent {
  public parallax_item: Array<any>;

  constructor() {
    this.parallax_item = [
      {
        top: "10%",
        left: "5%",
        size: "tiny",
        rotate: "10",
        opacity: "1",
        inversion: "true",
      },
      {
        top: "15%",
        left: "12%",
        size: "small",
        rotate: "20",
        opacity: "1"
      },
      {
        top: "75%",
        left: "72%",
        size: "middle",
        rotate: "20",
        opacity: "1"
      },
      {
        top: "65%",
        left: "32%",
        size: "big",
        rotate: "40",
        opacity: "1",
        inversion: "true",
        movement: "0.087",
      },
      {
        top: "35%",
        left: "92%",
        inversion: "true",
        size: "small",
        rotate: "20",
        opacity: "0.87"
      },
      {
        top: "25%",
        left: "62%",
        size: "small",
        rotate: "20",
        opacity: "1",
      },
      {
        top: "5%",
        left: "45%",
        size: "small",
        rotate: "90",
        inversion: "true",
        opacity: "1"
      },
      {
        top: "45%",
        left: "12%",
        size: "small",
        rotate: "20",
        opacity: "1"
      },
      {
        top: "65%",
        left: "62%",
        size: "middle",
        rotate: "20",
        opacity: "1",
        inversion: "true",
        movement: "0.087"
      },
      {
        top: "80%",
        left: "12%",
        size: "middle",
        rotate: "20",
        opacity: "1",
        inversion: "true",
        movement: "0.087"
      },
      {
        top: "12%",
        left: "80%",
        size: "middle",
        rotate: "20",
        opacity: "1",
        inversion: "true",
        movement: "0.087"
      },
      {
        top: "25%",
        left: "35%",
        size: "small",
        rotate: "20",
        opacity: "1"
      },
    ];
  }
}
