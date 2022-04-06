import { TestBed } from '@angular/core/testing';

import { MusicRetrieverService } from './music-retriever.service';

describe('MusicRetrieverService', () => {
  let service: MusicRetrieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
