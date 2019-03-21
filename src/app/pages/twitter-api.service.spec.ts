import { TestBed } from '@angular/core/testing';

import { TwitterApiService } from './twitter-api.service';

describe('TwitterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitterApiService = TestBed.get(TwitterApiService);
    expect(service).toBeTruthy();
  });
});
