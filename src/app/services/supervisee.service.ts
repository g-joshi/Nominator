import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EndpointUrls } from '../constants/endpointUrls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Supervisee } from '../models/supervisee.model';

@Injectable({
  providedIn: 'root'
})
export class SuperviseeService {

  // constructor
  constructor(private http: Http) { }

  /**
   * getSupervisees
   */
  getSupervisees(): Observable<Array<Supervisee>> {
    return this.http.get(EndpointUrls.GET_SUPERVISEES).pipe(
      map(response => response.json())
    );
  }

  /**
   * getSuperviseeDetails
   * @param emailId
   * @param name (optional)
   */
  getSuperviseeDetails(emailId: string, name?: string): Observable<Supervisee> {
    return this.http.get(EndpointUrls.GET_SUPERVISEE_DETAILS).pipe(
      map(response => response.json())
    );
  }
}
