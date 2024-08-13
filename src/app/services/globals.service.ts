import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  constructor() {}

  public interestingString: string = 'section00';

  public updateString$ = Observable.create((observer: any) => {
    observer.next(this.interestingString);
  });

  public interestingString$ = new Subject();
}
