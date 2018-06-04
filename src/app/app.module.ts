import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule, MatButtonModule, MatSnackBarModule,
  MatIconModule, MatMenuModule, MatExpansionModule, MatTableModule, MatDividerModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ManageNominationsComponent } from './components/nomination/manage-nominations/manage-nominations.component';
import { SubmitNominationComponent } from './components/nomination/submit-nomination/submit-nomination.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ManageUsersComponent } from './components/users/manage-users/manage-users.component';

import { SuperviseeService } from './services/supervisee.service';
import { NominationService } from './services/nomination.service';

import { FilterNominationsPipe } from './pipes/filter-nominations.pipe';

/**
 * Manage route should only be allowed for admins
 */
const appRoutes: Routes = [
  {
    path: 'nominations',
    component: ManageNominationsComponent
  }, {
    path: 'users',
    component: ManageUsersComponent
  }, {
    path: '',
    component: SubmitNominationComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SubmitNominationComponent,
    ManageNominationsComponent,
    HeaderComponent,
    NotFoundComponent,
    FilterNominationsPipe,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule,
    MatButtonModule, MatSnackBarModule, MatIconModule, MatMenuModule, MatExpansionModule,
    MatTableModule, MatDividerModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    SuperviseeService,
    NominationService
  ]
})
export class AppModule { }
