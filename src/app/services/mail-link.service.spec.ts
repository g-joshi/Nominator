import { TestBed, inject } from '@angular/core/testing';

import { MailLinkService } from './mail-link.service';

describe('MailLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailLinkService]
    });
  });

  it('should be created', inject([MailLinkService], (service: MailLinkService) => {
    expect(service).toBeTruthy();
  }));
});
