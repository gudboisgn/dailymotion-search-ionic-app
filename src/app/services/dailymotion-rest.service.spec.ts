import { TestBed } from '@angular/core/testing';

import { DailymotionRestService } from './dailymotion-rest.service';

describe('DailymotionRestService', () => {
  let service: DailymotionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailymotionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
