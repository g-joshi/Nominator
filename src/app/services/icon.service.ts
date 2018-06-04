import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  // constructor
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Add all icons here and inject this service in your component to use
    iconRegistry.addSvgIcon('outline-create', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-create-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-edit', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-edit-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-delete', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-delete-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-check', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-check-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-more_vert', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-more_vert-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-person', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-person-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-thumb_down_alt', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-thumb_down_alt-24px.svg'
    ));
    iconRegistry.addSvgIcon('outline-thumb_up', sanitizer.bypassSecurityTrustResourceUrl(
      'assets/icons/outline-thumb_up_alt-24px.svg'
    ));
  }
}
