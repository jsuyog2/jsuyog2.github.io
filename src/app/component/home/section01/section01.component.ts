import { Component } from '@angular/core';
import aboutme from '../../../../assets/data/aboutme.json';
@Component({
  selector: 'app-section01',
  templateUrl: './section01.component.html',
  styleUrls: ['./section01.component.scss'],
})
export class Section01Component {
  aboutme: any;
  ngOnInit() {
    this.aboutme = aboutme;
  }
}
