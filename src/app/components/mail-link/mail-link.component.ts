import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MailLinkService } from '../../services/mail-link.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'xt-mail-link',
  templateUrl: './mail-link.component.html',
  styleUrls: ['./mail-link.component.scss']
})
export class MailLinkComponent implements OnInit {
  supervisorEmailId: string;

  // constructor
  constructor(
    private route: ActivatedRoute,
    private mailLinkService: MailLinkService,
    private snackBar: MatSnackBar
  ) { }

  sendEmail() {
    this.mailLinkService.emailLink(this.supervisorEmailId).subscribe(
      // success
      data => {
        this.snackBar.open('Email Sent');
       },

      // failure
      data => { 
        this.snackBar.open('Email Sending failed, retry after some time');
      }
    );
  }

  ngOnInit() {
  }

}
