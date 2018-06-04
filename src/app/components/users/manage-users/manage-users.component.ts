import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonUtils } from '../../../utils/CommonUtils';
import { Roles } from '../../../enums/Roles';
import { DeleteUserRequest } from '../../../models/delete-user-req.model';

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
  submitForm(user: User) {
    if (this.addUserForm.valid) {
      // if form is valid, check if it is an update or create action
      if (user._id) {
        // user already exists, update user details
        this.userService.updateUser(user).subscribe((data) => {
          this.snackBar.open('User details updated successfully', '', { duration: 2000 });
        }, (data) => {
          this.snackBar.open('User details could not be updated due to some unknown error, please try again', 'Dismiss');
        });
      } else {
        // user does not exist, add new user
        this.userService.addUser(user).subscribe((data) => {
          this.snackBar.open('User added successfully', '', { duration: 2000 });
        }, (data) => {
          this.snackBar.open('User not added due to some unknown error, please try again', 'Dismiss');
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * deleteUser
   * @param user 
   */
  deleteUser(user: User): void {
    this.userService.deleteUser(user._id).subscribe((data) => {
      this.snackBar.open('User deleted successfully', '', { duration: 2000 });
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
