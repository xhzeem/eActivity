import { TestBed } from '@angular/core/testing';

import { UserIsUserGuard } from './user-is-user.guard';

describe('UserIsUserGuard', () => {
  let guard: UserIsUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserIsUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
