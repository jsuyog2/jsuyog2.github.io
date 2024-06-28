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
    this.experience.edu.map((val: any) => {
      val.year = this.returnDateFormat(val.year);
      return val
    })
    this.experience.work.map((val: any) => {
      const duration = this.returnDuration(val.start_date, val.end_date);
      val.duration = duration
      return val
    })
  }

  returnDuration(start_date: any, end_date: any) {
    let start = this.returnDateFormat(start_date);
    let end = end_date ? this.returnDateFormat(end_date) : 'Present';
    return `${start} - ${end}`;
  }

  returnDateFormat(date: any) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date_month = month[new Date(date).getMonth()];
    let date_year = new Date(date).getFullYear();
    return `${date_month} ${date_year}`
  }
}
