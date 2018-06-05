import { Component, OnInit, OnDestroy } from '@angular/core';
import { NominationService } from '../../../services/nomination.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApprovalStatuses } from '../../../enums/ApprovalStatuses';
import { CommonUtils } from '../../../utils/CommonUtils';
import { CoreCapabilities } from '../../../enums/CoreCapabilities';
import { Priorities } from '../../../enums/Priorities';
import { FlightRisks } from '../../../enums/FlightRisks';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconService } from '../../../services/icon.service';
import { Nomination } from '../../../models/nomination.model';
import { UpdateNominationResponse } from '../../../models/update-nomination-res.model';

@Component({
  selector: 'xt-manage-nominations',
  templateUrl: './manage-nominations.component.html',
  styleUrls: ['./manage-nominations.component.scss']
})
export class ManageNominationsComponent implements OnInit, OnDestroy {
  panelOpenState: boolean = false;
  nominationsList: Array<Nomination>;
  getNominationSubscription: Subscription;

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
    icons: IconService
  ) { }

  /**
   * updateNominationStatus
   * @param nomination 
   * @param status 
   */
  updateNominationStatus(nomination: Nomination, status: string) {
    nomination.status = ApprovalStatuses[status];

    this.nominationService.updateNomination(nomination).subscribe((data: UpdateNominationResponse) => {
      switch (status) {
        case "In Progress": {
          this.snackBar.open('Nomination has been deferred to later', '', {
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

  // On Onit
  ngOnInit() {
    this.getNominationSubscription = this.nominationService.getNominations().subscribe(
      nominationList => {
        this.nominationsList = nominationList;
      });
  }

  // On Destroy
  ngOnDestroy() {
    if (this.getNominationSubscription) {
      this.getNominationSubscription.unsubscribe();
    }
  }
}
