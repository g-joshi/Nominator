import { Component, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'xt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(icons: IconService) { }

  ngOnInit() {
  }

}
