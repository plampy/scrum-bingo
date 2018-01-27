import { TestBed, async, inject } from '@angular/core/testing';

import { BoardCreatedGuard } from './board-created.guard';

describe('BoardCreatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardCreatedGuard]
    });
  });

  it('should ...', inject([BoardCreatedGuard], (guard: BoardCreatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
