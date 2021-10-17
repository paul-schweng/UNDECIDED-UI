import { TestBed } from '@angular/core/testing';

import { BaseCommunicationService } from './base-communication.service';

describe('BaseCommunicationService', () => {
  let service: BaseCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
