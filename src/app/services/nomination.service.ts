import { Injectable } from '@angular/core';
import { Http, ResponseContentType, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointUrls } from '../constants/endpointUrls';
import { Nomination } from '../models/nomination.model';
import { CreateNominationResponse } from '../models/create-nomination-res.model';
import { CommonUtils } from '../utils/CommonUtils';

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
   * updateNomination
   * @param nomination
   */
  updateNomination(nomination: Nomination): Observable<Nomination> {
    return this.http.put(CommonUtils.populateURLTemplate(
      EndpointUrls.UPDATE_NOMINATION_STATUS, {
        "id": nomination._id
      }
    ), nomination).pipe(
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

  /**
   * exportNominations
   */
  exportNominations(): Observable<any> {
    return this.http.get(EndpointUrls.EXPORT_NOMINATIONS, {
      responseType: ResponseContentType.Blob
    }).pipe(
      map(res => res.blob())
    );
  }
}
