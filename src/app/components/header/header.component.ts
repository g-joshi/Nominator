import { Component, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { NominationService } from '../../services/nomination.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'xt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // constructor
  constructor(
    private icons: IconService,
    private nominationService: NominationService
  ) { }

  /**
   * exportNominations
   */
  exportNominations() {
    let currentDate: Date = new Date();
    this.nominationService.exportNominations().subscribe(blob => {
      FileSaver.saveAs(blob, `Nominations-${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}.xlsx`);
    });
  }

  ngOnInit() { }

}
