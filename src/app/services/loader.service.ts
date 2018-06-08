import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject();
  loaderSubject$ = this.loaderSubject.asObservable();

  showLoader() {
    return this.loaderSubject.next(true);
  }

  hideLoader() {
    return this.loaderSubject.next(false);
  }

  // constructor
  constructor() { }
}
