import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointUrls } from '../constants/endpointUrls';
import { Nomination } from '../models/nomination.model';
import { CreateNominationResponse } from '../models/create-nomination-res.model';

@Injectable({
  providedIn: 'root'
})
export class NominationService {

  // constructor
  constructor(private http: Http) { }

  /**
   * submitNomination
   * @param nomination
   */
  submitNomination(nomination: Nomination): Observable<CreateNominationResponse> {
    return this.http.post(EndpointUrls.SUBMIT_NOMINATION, nomination).pipe(
      map(response => response.json())
    );
  }

  /**
   * getNominations
   */
  getNominations(): Observable<Array<Nomination>> {
    return this.http.get(EndpointUrls.GET_NOMINATIONS).pipe(
      map(response => response.json())
    );
  }
}
