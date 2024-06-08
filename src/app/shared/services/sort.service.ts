import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  sortData(data: any[], sort: Sort): Observable<any[]> {
    if (!sort.active || sort.direction === '') {
      return of(data);
    }

    const dataToSort = [...data];

    const sortedData = dataToSort.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });

    return of(sortedData);
  }

  compare(a: any, b: any, isAsc: boolean): number {
    if (a < b) {
      return isAsc ? -1 : 1;
    } else if (a > b) {
      return isAsc ? 1 : -1;
    } else {
      return 0;
    }
  }
}
