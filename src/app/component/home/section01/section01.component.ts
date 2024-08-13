import { Component } from '@angular/core';
import aboutme from '../../../../assets/data/aboutme.json';
import projects from '../../../../assets/data/projects.json';

@Component({
  selector: 'app-section01',
  templateUrl: './section01.component.html',
  styleUrls: ['./section01.component.scss'],
})
export class Section01Component {
  aboutme: any;
  totalProjects: number = 0;
  totalExperience: number = 0;
  totalCupCoffee: number = 0;
  ngOnInit() {
    this.aboutme = aboutme;
    this.totalProjects = projects.length;
    const currentDate: number = new Date().getFullYear();
    const startDate: number = new Date('09/11/2018').getFullYear();
    console.log("Weeks", this.monthDiff(new Date('09/11/2018'), new Date()));

    this.totalExperience = currentDate - startDate;
    this.totalCupCoffee = (((this.totalExperience * 365) + this.totalProjects)) * 3;
  }
  monthDiff(d1: any, d2: any) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
}
