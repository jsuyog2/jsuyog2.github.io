import { Component } from '@angular/core';
import experience from '../../../../assets/data/experience.json';
@Component({
  selector: 'app-section04',
  templateUrl: './section04.component.html',
  styleUrls: ['./section04.component.scss'],
})
export class Section04Component {
  experience: any;
  ngOnInit() {
    this.experience = experience;
  }
}
