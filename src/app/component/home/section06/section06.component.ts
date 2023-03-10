import { Component } from '@angular/core';
import aboutme from '../../../../assets/data/aboutme.json';
@Component({
  selector: 'app-section06',
  templateUrl: './section06.component.html',
  styleUrls: ['./section06.component.scss'],
})
export class Section06Component {
  aboutme: any;
  ngOnInit() {
    this.aboutme = aboutme;
  }
}
