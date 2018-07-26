import { Component, OnInit, OnDestroy } from '@angular/core';
import { NominationService } from '../../../services/nomination.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApprovalStatuses } from '../../../enums/ApprovalStatuses';
import { CommonUtils } from '../../../utils/CommonUtils';
import { CoreCapabilities } from '../../../enums/CoreCapabilities';
import { Priorities } from '../../../enums/Priorities';
import { FlightRisks } from '../../../enums/FlightRisks';
import { FormGroup, FormControl } from '@angular/forms';
import { IconService } from '../../../services/icon.service';
import { Nomination } from '../../../models/nomination.model';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'xt-manage-nominations',
  templateUrl: './manage-nominations.component.html',
  styleUrls: ['./manage-nominations.component.scss']
})
export class ManageNominationsComponent implements OnInit, OnDestroy {
  panelOpenState: boolean = false;
  nominationsList: Array<Nomination>;
  getNominationSubscription: Subscription;
  user;
  encOId;

  // Getters
  public get searchText(): string {
    return this.searchForm.get('searchText').value;
  }

  // create form for applying search and filters
  searchForm: FormGroup = new FormGroup({
    searchText: new FormControl('')
  });

  // arrays
  approvalStatuses = ApprovalStatuses;
  coreCapabilitiesList = CommonUtils.convertEnumToArray(CoreCapabilities);
  prioritiesList = CommonUtils.convertEnumToArray(Priorities);
  flightRisksList = CommonUtils.convertEnumToArray(FlightRisks);

  // constructor
  constructor(
    private nominationService: NominationService,
    private snackBar: MatSnackBar,
    icons: IconService,
    private route: ActivatedRoute
  ) { }

  /**
   * withdrawNomination
   * @param nomination 
   */
  withdrawNomination(nomination: Nomination) {
    this.nominationService.withdrawNomination(nomination).subscribe((data: Nomination) => {
      this.getNominations();
      this.snackBar.open('Nomination withdrawn', '', {
        duration: 1000
      });
    });
  }

  /**
   * updateNominationStatus
   * @param nomination 
   * @param status 
   */
  updateNominationStatus(nomination: any, status: any) {

    // Do not submit if no comments added
    if (!nomination.reason || !nomination.buttonClicked) {
      nomination.buttonClicked = true;
      this.snackBar.open(`
      Please add a reason for 
        ${
        status == 1 ? 'approval' :
          status == 0 ? 'moving the nomination to pending' :
            status === -1 ? 'rejection' : ''}`);
      return;
    }
    nomination.status = ApprovalStatuses[status];

    this.nominationService.updateNomination(nomination).subscribe((data: Nomination) => {
      switch (data.status) {
        case "In Progress": {
          this.snackBar.open('Nomination has been marked for review', '', {
            duration: 1000
          });
          break;
        }

        case "Approved": {
          this.snackBar.open('Nomination approved successfully', '', {
            duration: 1000
          });
          break;
        }

        case "Declined": {
          this.snackBar.open('Nomination declined successfully', '', {
            duration: 1000
          });
          break;
        }
      }
    }, (data) => {
      this.snackBar.open(`Nomination status could not be updated, please try again`, 'Dismiss');
    });
  }

  /**
   * getNominations
   */
  getNominations() {
    this.getNominationSubscription = this.nominationService.getNominations().subscribe(
      nominationList => {
        this.nominationsList = nominationList;
      });
  }

  // On Onit
  ngOnInit() {
    this.route.data.subscribe(data => {
      // Get all the resolver data here, we can get user info based on enc id
      this.user = data.user;
    });
    this.route.params.subscribe(data => {
      this.encOId = data.encOId;
    });
    this.getNominations();
  }

  // On Destroy
  ngOnDestroy() {
    if (this.getNominationSubscription) {
      this.getNominationSubscription.unsubscribe();
    }
  }
}
