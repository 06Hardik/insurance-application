import { TestBed } from '@angular/core/testing';

import { OpenPolicyFormService } from './open-policy-form.service';

describe('OpenPolicyFormService', () => {
  let service: OpenPolicyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenPolicyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
