import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Error } from '../../../models/error.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonUtils } from '../../../utils/CommonUtils';
import { Roles } from '../../../enums/Roles';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'xt-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns = ['name', 'role', 'cta-edit', 'cta-delete'];
  users: MatTableDataSource<User>;

  // data arrays
  rolesList = CommonUtils.convertEnumToArray(Roles);

  // Form
  addUserForm: FormGroup;

  // constructor
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * applyFilter
   * @param filterValue 
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users.filter = filterValue;
  }

  /**
   * createUserForm
   * @param user
   */
  createUserForm(user: any = {}) {
    this.addUserForm = new FormGroup({
      name: new FormControl(user.name || '', [Validators.required]),
      emailId: new FormControl(user.emailId || '', [Validators.required]),
      role: new FormControl(user.role || '', [Validators.required]),
      _id: new FormControl(user._id || '')
    });
  }

  /**
   * getUsers()
   * Returns list of users via UserService
   */
  getUsers() {
    this.userService.getUsers().subscribe(userList => {
      this.users = new MatTableDataSource(userList);
    });
  }

  /**
   * submitForm
   * @param user
   */
  submitForm() {
    this.loaderService.showLoader();

    if (this.addUserForm.valid) {
      let user = this.addUserForm.value;
      // if form is valid, check if it is an update or create action
      if (user._id) {
        // user already exists, update user details
        this.userService.updateUser(user).subscribe((data) => {
          this.snackBar.open('User details updated successfully', '', { duration: 2000 });
          this.getUsers();
          this.addUserForm.reset();
          this.loaderService.hideLoader();
        }, (data) => this.showError(data.json()));
      } else {
        // user does not exist, add new user
        this.userService.addUser(user).subscribe((data) => {
          this.snackBar.open('User added successfully', '', { duration: 2000 });
          this.getUsers();
          this.addUserForm.reset();
          this.loaderService.hideLoader();
        }, (data) => this.showError(data.json()));
      }
    }
  }

  /**
   * showError
   * @param error 
   */
  showError(error?: Error) {
    this.loaderService.hideLoader();
    let errorMessage = '';

    switch (error.code) {
      case 11000: {
        errorMessage = 'User email already exists';
        break;
      }
      default: {
        errorMessage = 'User details could not be updated due to some unknown error, please try again';
        break;
      }
    }
    this.snackBar.open(errorMessage, 'Dismiss');
  }

  /**
   * deleteUser
   * @param user 
   */
  deleteUser(user: User): void {
    this.userService.deleteUser({ _id: user._id }).subscribe((data) => {
      this.snackBar.open('User deleted successfully', '', { duration: 2000 });
      this.getUsers();
      this.addUserForm.reset();
    }, (data) => {
      this.snackBar.open('User could not be deleted due to some unknown error, please try again', 'Dismiss');
    });
  }

  // OnInit
  ngOnInit() {
    this.getUsers();
    this.createUserForm();
  }
}
