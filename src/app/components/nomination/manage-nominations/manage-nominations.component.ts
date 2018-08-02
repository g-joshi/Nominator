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
  public meetList: { value: boolean; label:string; checked: boolean; }[];
  public roleList: { value: string; checked: boolean; }[];
  public flightRisks: { value: string; checked: boolean; }[];
  public locationFilter: { value: string; checked: boolean; }[];
  public filterPriority: { value: string; checked: boolean; }[];;
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

  getCheckedPriority() {
    return this.filterPriority.filter(item => { return item.checked; });
  }

  getCheckedLocations() {
    return this.locationFilter.filter(item => { return item.checked; });
  }

  getCheckedflightRisks() {
    return this.flightRisks.filter(item => { return item.checked; });
  }

  getCheckedCurrentTitle() {
    return this.roleList.filter(item => { return item.checked; });
  }

  isMeetChecked() {
    return this.meetList.filter(item => { return item.checked; });
  }

  // constructor
  constructor(
    private nominationService: NominationService,
    private snackBar: MatSnackBar,
    icons: IconService,
    private route: ActivatedRoute
  ) {
    this.filterPriority = [
        {
          value: 'P1',
          checked: false
        },
        {
          value: 'P2',
          checked: false
        },
        {
          value: 'P3',
          checked: false
        }
    ];

    this.locationFilter = [
      {
        value:'Noida',
        checked: false
      },
      {
        value:'Banglore',
        checked: false
      },
      {
        value:'Gurugram',
        checked: false,
      }
    ];
    this.flightRisks = [
      {
        value:'Already Resigned',
        checked: false
      },
      {
        value:'High Risk',
        checked: false
      },
      {
        value:'May be / Not Sure',
        checked: false,
      },
      {
        value:'Do not think so',
        checked: false,
      },
      {
        value:'No Risk',
        checked: false,
      }
    ]
    this.roleList = [
      {
        value:'AL1',
        checked: false
      },
      {
        value:'AL2',
        checked: false
      },
      {
        value:'SAL1',
        checked: false
      },
      {
        value:'SAL2',
        checked: false
      },
      {
        value:'Manager',
        checked: false
      },
      {
        value:'Senior Manager',
        checked: false
      },
      {
        value:'Director',
        checked: false
      },
      {
        value:'Senior Director',
        checked: false
      }
    ]
    this.meetList = [
      {
        value:true,
        label: 'Meet time in title Criteria',
        checked: false
      },
      {
        value:false,
        label: 'Does not Meet Time in Title Criteria',
        checked: false
      }
    ]
   }

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
            status === -1 ? 'rejection' : ''}`, '', {
              duration: 1000
            });
      return;
    }
    nomination.status = ApprovalStatuses[status];

    this.nominationService.updateNomination(nomination).subscribe((data: Nomination) => {
      this.getNominations();
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
