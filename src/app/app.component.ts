import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loaderStatus;

  // constructor
  constructor(
    private loaderService: LoaderService
  ) { }

  // ngOnInit
  ngOnInit() {
    this.loaderService.loaderSubject$.subscribe(data => {
      this.loaderStatus = data;
    });
  }
}
