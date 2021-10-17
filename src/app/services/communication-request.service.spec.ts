import { TestBed } from '@angular/core/testing';

import { CommunicationRequestService } from './communication-request.service';

describe('CommunicationRequestService', () => {
  let service: CommunicationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
