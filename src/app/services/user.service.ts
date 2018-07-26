import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointUrls } from '../constants/endpointUrls';
import { CommonUtils } from '../utils/CommonUtils';

import { DeleteUserResponse } from '../models/delete-user-res.model';
import { User } from '../models/user.model';
import { DeleteUserRequest } from '../models/delete-user-req.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // constructor
  constructor(private http: Http) { }

  /**
   * getUserDetails
   * Validate user and return list of supervisees and other details
   * @param encOId
   */
  getUserDetails(encOId: string) {
    return this.http.get(CommonUtils.populateURLTemplate(
      EndpointUrls.GET_USER_DETAILS, {
        encOId: encOId
      }
    )).pipe(
      map(response => {
        return response.json();
      })
    );
  }

  /**
   * getUsers
   * Return a list of users with their respective roles
   */
  getUsers(): Observable<User[]> {
    return this.http.get(EndpointUrls.GET_USERS).pipe(
      map(response => response.json())
    );
  }

  /**
   * addUser
   * @param user
   */
  addUser(user: User): Observable<User> {
    return this.http.post(EndpointUrls.ADD_USER, user).pipe(
      map(response => response.json())
    );
  }

  /**
   * updateUser
   * @param user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put(CommonUtils.populateURLTemplate(EndpointUrls.UPDATE_USER, {
      'id': user._id
    }), user).pipe(
      map(response => response.json())
    );
  }

  /**
   * deleteUser
   * @param user
   */
  deleteUser(deleteUserReq: DeleteUserRequest): Observable<DeleteUserResponse> {
    return this.http.delete(CommonUtils.populateURLTemplate(EndpointUrls.DELETE_USER, {
      'id': deleteUserReq._id
    }), {}).pipe(
      map(response => response.json())
    );
  }
}
