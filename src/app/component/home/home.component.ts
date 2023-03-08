import { Component } from '@angular/core';
import aboutme from '../../../assets/data/aboutme.json';
import services from '../../../assets/data/services.json';
import experience from '../../../assets/data/experience.json';
import projects from '../../../assets/data/projects.json';
import achievements from '../../../assets/data/achievements.json';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  aboutme: any;
  services: any;
  experience: any;
  projects: any;
  achievements: any;
  title: string = 'Full Stack Developer';
  titleArray: any = [
    'Full Stack Developer',
    'Front-End developer',
    'Back-End developer',
  ];
  description_length = 100;
  ngOnInit() {
    this.aboutme = aboutme;
    this.services = services;
    this.experience = experience;
    this.projects = projects;
    this.achievements = achievements;
    var i = 1;
    setInterval(() => {
      $('.headerTitle').removeClass('load');
      setTimeout(() => {
        this.title = this.titleArray[i];
        $('.headerTitle').addClass('load');
        i++;
        if (i === 3) {
          i = 0;
        }
      }, 1000);
    }, 5000);
  }
  validURL(str: any) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
  showMore(event: any) {
    let target = event.target;
    let element = $(target).closest('div').find('p');
    if (element.css('display').includes('-webkit-box')) {
      element.css('display', 'block');
      $(target).html('Hide');
    } else if (element.css('display').includes('block')) {
      element.css('display', '-webkit-box');
      $(target).html('Show More');
    }
  }
}
