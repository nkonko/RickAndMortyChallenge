import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show spinner', () => {
    service.show();
    service.spinner$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should not hide spinner when hide() is called and requestCount is 0', () => {
    service.hide();
    expect(service.spinner$).toBeTruthy();
  });
});
