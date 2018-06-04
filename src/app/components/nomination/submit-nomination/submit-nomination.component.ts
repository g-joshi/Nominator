import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Titles } from '../../../enums/Titles';
import { CoreCapabilities } from '../../../enums/CoreCapabilities';
import { Priorities } from '../../../enums/Priorities';
import { CommonUtils } from '../../../utils/CommonUtils';
import { SuperviseeService } from '../../../services/supervisee.service';
import { FlightRisks } from '../../../enums/FlightRisks';
import { NominationService } from '../../../services/nomination.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { Supervisee } from '../../../models/supervisee.model';

@Component({
  selector: 'xt-submit-nomination',
  templateUrl: './submit-nomination.component.html',
  styleUrls: ['./submit-nomination.component.scss']
})
export class SubmitNominationComponent implements OnInit {
  nominees;
  homeLocation: string;

  // enums
  private titles = Titles;
  private priorities = Priorities;
  private flightRisks = FlightRisks;

  // arrays
  coreCapabilitiesList = CommonUtils.convertEnumToArray(CoreCapabilities);
  prioritiesList = CommonUtils.convertEnumToArray(Priorities);
  flightRisksList = CommonUtils.convertEnumToArray(FlightRisks);

  // defaults
  currentTitle;

  // create form
  submitNominationForm: FormGroup = new FormGroup({
    nomineeName: new FormControl('', [Validators.required]),
    coreCapabilities: new FormControl('', [Validators.required]),
    businessImpact: new FormControl('', [Validators.required]),
    projectFeedback: new FormControl('', [Validators.required]),
    performanceSummary: new FormControl('', [Validators.required]),
    developmentAreas: new FormControl('', [Validators.required]),
    communityContributions: new FormControl('', [Validators.required]),
    anyHistory: new FormControl('', [Validators.required]),
    differentiatorComment: new FormControl('', [Validators.required]),
    whatWillChangeComment: new FormControl('', [Validators.required]),
    discussionPoints: new FormControl('', [Validators.required]),
    projectName: new FormControl('', [Validators.required]),
    flightRisk: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required])
  });

  // contructor
  constructor(
    private superviseeService: SuperviseeService,
    private nominationService: NominationService,
    private snackBar: MatSnackBar
  ) {
    // Get nominee details on selection
    this.submitNominationForm.get('nomineeName').valueChanges.subscribe((data) => {
      this.superviseeService.getSuperviseeDetails(data.emailId).subscribe((supervisee: Supervisee) => {
        let nomineeData = supervisee;
        this.currentTitle = Titles[nomineeData["title"]];
        this.homeLocation = nomineeData.homeLocation;
      });
    });
  }

  /**
   * submitNomination
   */
  submitNomination() {
    if (this.submitNominationForm.valid) {
      let nomination = this.submitNominationForm.value;
      nomination.currentTitle = this.currentTitle;
      nomination.nextTitle = this.titles[this.currentTitle + 1];
      nomination.homeLocation = this.homeLocation;
      console.log(nomination);
      this.nominationService.submitNomination(nomination).subscribe((data) => {
        this.snackBar.open('Nomination submitted successfully', '', {
          duration: 2000
        });
      }, (data) => {
        this.snackBar.open('Nomination failed due to some error, please submit again', 'Dismiss');
      });
    }
  }

  // OnInit
  ngOnInit() {
    this.superviseeService.getSupervisees().subscribe(superviseeList => {
      this.nominees = superviseeList;
    });
  }
}
