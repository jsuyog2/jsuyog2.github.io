import { Input, Component } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentSection: any = 'section00';
  constructor(public globals: GlobalsService) {}
  ngOnInit() {
    $('#menu-btn').on('click', () => {
      $('#sidebar').toggleClass('active-nav');
      $('nav').toggleClass('active-cont');
      $('.main').toggleClass('active-cont');
    });
    this.globals.interestingString$.subscribe((data) => {
      this.currentSection = data;
    });
  }
  scroll(id: any) {
    const elmnt: any = document.getElementById(id);
    $('#sidebar').removeClass('active-nav');
    $('nav').removeClass('active-cont');
    $('.main').removeClass('active-cont');
    elmnt.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
