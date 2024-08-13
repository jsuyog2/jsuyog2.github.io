import { Component } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentSection: any = 'section00';
  constructor(public globals: GlobalsService) {}
  onSectionChange(sectionId: any) {
    this.currentSection = sectionId;
    this.globals.interestingString = sectionId;
    this.globals.updateString$.subscribe(this.globals.interestingString$);
  }
}
