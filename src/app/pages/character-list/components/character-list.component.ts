import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, filter, fromEvent, map, of, take, takeUntil, throttleTime } from 'rxjs';
import { loadCharacters, loadPage } from '../../../core/store/actions/character.action';
import { Character } from '../../../core/models/character.interface';
import { selectCharacters, selectPages } from '../../../core/store/selectors/character.selectors';
import { Info } from '../../../core/models/info.interface';
import { CommonMaterialModule } from '../../../core/modules/material/common-material.module';
import { CharacterFilterInputComponent } from '../../../shared/character-filter-input/character-filter-input.component';
import { RouterLink } from '@angular/router';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonMaterialModule,
    CharacterFilterInputComponent,
    CustomTableComponent,
    RouterLink
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit, AfterViewInit,  OnDestroy {
  dataSource = new MatTableDataSource<Character>();
  characters$: Observable<Character[]>;
  characters: Character[] = [];
  pageInfo$: Observable<Info>;
  info!: Info;
  displayedColumns: string[] = [
    'image',
    'name',
    'status',
    'species',
    'episodes',
  ];
  unsuscribe$ = new Subject<void>();
  scrollSubscription: Subscription | undefined;

  @ViewChild('bottomAnchor', { static: true }) bottomAnchor!: ElementRef;

  constructor(private store: Store) {
    this.characters$ = this.store.select(selectCharacters);
    this.pageInfo$ = this.store.select(selectPages);
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();

    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadCharacters());

    this.characters$.pipe(takeUntil(this.unsuscribe$)).subscribe(characters => {
      this.dataSource = new MatTableDataSource(characters);
      this.characters = [...characters];
    });

    this.pageInfo$.pipe(takeUntil(this.unsuscribe$)).subscribe(info => {
      this.info = info;
    })
  }

  ngAfterViewInit(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(200),
        filter(() => this.isUserNearBottom())
      )
      .subscribe(() => this.loadNextPage());
  }

  sortData(sort: Sort) {
    this.characters$.pipe(
      take(1),
      map(characters => {
        if (!sort.active || sort.direction === '') {
          return characters;
        }

        return this.characters.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'name':
              return this.compare(a.name, b.name, isAsc);
            case 'status':
              return this.compare(a.status, b.status, isAsc);
            case 'species':
              return this.compare(a.species, b.species, isAsc);
            case 'episodes':
              return this.compare(a.episode.length, b.episode.length, isAsc);
            default:
              return 0;
          }
        });
      })
    ).subscribe(sortedCharacters => {
      this.characters$ = of(sortedCharacters);
    });
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  isUserNearBottom(): boolean {
    const scrollPosition = window.scrollY + window.innerHeight;
    const anchorPosition = this.bottomAnchor.nativeElement.offsetTop;
    return scrollPosition > anchorPosition;
  }

  loadNextPage(): void {
    const nextPage = this.info?.next;
    if (nextPage) {
      this.store.dispatch(loadPage({pageUrl: nextPage}))
    }
  }

  applyFilter(filterCriteria: any): void {
    this.dataSource.filter = JSON.stringify(filterCriteria);
  }


}
