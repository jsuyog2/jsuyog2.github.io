import { Component } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import projects from '../../../../assets/data/projects.json';
@Component({
  selector: 'app-section03',
  templateUrl: './section03.component.html',
  styleUrls: ['./section03.component.scss'],
})
export class Section03Component {
  products: any;
  responsiveOptions: any;
  projects: any;
  description_length = 150;
  projectId: number = 0;
  constructor(private modalService: NgbModal) { }
  ngOnInit() {
    this.projects = projects;
    this.projects.map((val: any, index: any) => {
      console.log(index);
      
      val.id = index
      if (val.start_date) {
        const duration = this.returnDuration(val.start_date, val.end_date);
        val.duration = duration
      }
      return val
    })
    this.products = this.projects
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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
  open(content: any, id: any) {
    this.projectId = id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true });
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

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return 'success';
  }

}
