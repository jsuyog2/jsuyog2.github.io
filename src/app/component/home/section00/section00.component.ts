import { Component } from '@angular/core';

@Component({
  selector: 'app-section00',
  templateUrl: './section00.component.html',
  styleUrls: ['./section00.component.scss'],
})
export class Section00Component {
  title: string = 'Full Stack Developer';
  titleArray: any = [
    'Full Stack Developer',
    'Front-End Developer',
    'Back-End Developer',
  ];
  ngOnInit() {
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
  scroll(id: any) {
    const elmnt: any = document.getElementById(id);
    elmnt.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
