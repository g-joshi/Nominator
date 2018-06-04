import { TestBed, inject } from '@angular/core/testing';

import { SuperviseeService } from './supervisee.service';

describe('SuperviseeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperviseeService]
    });
  });

  it('should be created', inject([SuperviseeService], (service: SuperviseeService) => {
    expect(service).toBeTruthy();
  }));
});
