import { Component, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { NominationService } from '../../services/nomination.service';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'xt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user;
  private encOId;

  // constructor
  constructor(
    private icons: IconService,
    private nominationService: NominationService,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.encOId = data.encOId;
    });
    this.route.data.subscribe(data => {
      // Get all the resolver data here, we can get user info based on enc id
      this.user = data.user;
    });
  }

}
