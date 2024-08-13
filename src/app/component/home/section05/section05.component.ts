import { Component } from '@angular/core';
import achievements from '../../../../assets/data/achievements.json';
@Component({
  selector: 'app-section05',
  templateUrl: './section05.component.html',
  styleUrls: ['./section05.component.scss'],
})
export class Section05Component {
  achievements: any;
  ngOnInit() {
    this.achievements = achievements;
  }
}
