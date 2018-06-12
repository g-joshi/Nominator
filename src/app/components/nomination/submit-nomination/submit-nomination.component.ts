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
import { Error } from '../../../models/error.model';
import { LoaderService } from '../../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xt-submit-nomination',
  templateUrl: './submit-nomination.component.html',
  styleUrls: ['./submit-nomination.component.scss']
})
export class SubmitNominationComponent implements OnInit {
  nominees;
  homeLocation: string;
  emailId: string;
  supervisorName: string;
  supervisorEmailId: string;

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
    name: new FormControl('', [Validators.required]),
    coreCapabilities: new FormControl('', [Validators.required]),
    projectName: new FormControl('', [Validators.required]),
    businessImpact: new FormControl('', [Validators.required]),
    projectFeedback: new FormControl('', [Validators.required]),
    performanceSummary: new FormControl('', [Validators.required]),
    developmentAreas: new FormControl('', [Validators.required]),
    communityContributions: new FormControl('', [Validators.required]),
    flightRisk: new FormControl('', [Validators.required]),
    anyOtherHistory: new FormControl('', [Validators.required]),
    isDifferentiatorComment: new FormControl('', [Validators.required]),
    whatWillChange: new FormControl('', [Validators.required]),
    discussionPoints: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    timeInTitle: new FormControl('')
  });

  // contructor
  constructor(
    private superviseeService: SuperviseeService,
    private nominationService: NominationService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private router: Router
  ) {
    // Get nominee details on selection
    this.submitNominationForm.get('name').valueChanges.subscribe((data = {}) => {
      if(data) {
        this.superviseeService.getSuperviseeDetails(data.emailId).subscribe((supervisee: Supervisee) => {
          let nomineeData = supervisee;
          this.currentTitle = Titles[nomineeData["title"]];
          this.homeLocation = nomineeData.homeLocation;
          this.emailId = nomineeData.emailId;
          this.supervisorName = nomineeData.supervisorName;
          this.supervisorEmailId = nomineeData.supervisorEmailId;
        });
      }
    });
  }

  /**
   * submitNomination
   */
  submitNomination() {
    this.loaderService.showLoader();

    if (this.submitNominationForm.valid) {
      let nomination = this.submitNominationForm.value;
      nomination.currentTitle = this.currentTitle;
      nomination.nextTitle = this.titles[this.currentTitle + 1];
      nomination.homeLocation = this.homeLocation;
      nomination.emailId = this.emailId;
      nomination.supervisorName = this.supervisorName;
      nomination.supervisorEmailId = this.supervisorEmailId;

      this.nominationService.submitNomination(nomination).subscribe((data) => {
        this.loaderService.hideLoader();
        this.submitNominationForm.reset();
        this.snackBar.open('Nomination submitted successfully', '', {
          duration: 2000
        });
      }, (data) => {
        this.loaderService.hideLoader();
        this.showError(data.json());
      });
    }
  }

  /**
   * showError
   * @param error 
   */
  showError(error: Error) {
    this.loaderService.hideLoader();
    let errorMessage = '';

    switch (error.code) {
      case 11000: {
        errorMessage = 'This nominee has aleady been nominated';
        this.snackBar.open(errorMessage, 'View Nominations').onAction().subscribe((() => {
          this.router.navigate(['/nominations']);
        }));
        break;
      }
      default: {
        errorMessage = 'Nomination could not be created due to some unknown error, please try again';
        this.snackBar.open(errorMessage, 'Dismiss');
        break;
      }
    }
  }

  // OnInit
  ngOnInit() {
    this.superviseeService.getSupervisees().subscribe(superviseeList => {
      this.nominees = superviseeList;
    });
  }
}
