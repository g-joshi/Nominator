import { Injectable } from '@angular/core';
import { Http, Response } from '../../../node_modules/@angular/http';
import { EndpointUrls } from '../constants/endpointUrls';

@Injectable({
  providedIn: 'root'
})
export class MailLinkService {
  // constructor
  constructor(private http: Http) { }

  emailLink(supervisorEmailId: string) {
    return this.http.post(EndpointUrls.EMAIL_LINK, {
      supervisorEmailId: supervisorEmailId
    })
  }
}
