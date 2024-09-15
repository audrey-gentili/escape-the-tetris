import { TestBed } from '@angular/core/testing';

import { PiecesDebloqueesService } from './pieces-debloquees.service';

describe('PiecesDebloqueesService', () => {
  let service: PiecesDebloqueesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiecesDebloqueesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
