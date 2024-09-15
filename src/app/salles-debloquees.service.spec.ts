import { TestBed } from '@angular/core/testing';

import { SallesDebloqueesService } from './salles-debloquees.service';

describe('SallesDebloqueesService', () => {
  let service: SallesDebloqueesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SallesDebloqueesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
