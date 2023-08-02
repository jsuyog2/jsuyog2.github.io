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
    this.totalExperience = currentDate - startDate;
    this.totalCupCoffee = (((this.totalExperience * 365) + this.totalProjects)) * 3;
  }
}
