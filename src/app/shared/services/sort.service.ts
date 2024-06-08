import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sortData<T>(data: Observable<T[]>, sort: Sort) {
    data.pipe(
      take(1),
      map(data => {
        if(!sort.active || sort.direction === ''){
          return data
        }

        return data.sort((a,b) => {
          const isAsc = sort.direction === 'asc';
          switch(sort.active) {

            default:
              return 0;
          }
        })
      })
    )
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
