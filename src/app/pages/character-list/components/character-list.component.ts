import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, filter, fromEvent, takeUntil, throttleTime } from 'rxjs';
import { loadCharacters, loadPage } from '../../../core/store/actions/character.action';
import { Character } from '../../../core/models/character.interface';
import { selectCharacters, selectPages } from '../../../core/store/selectors/character.selectors';
import { Info } from '../../../core/models/info.interface';
import { CommonMaterialModule } from '../../../core/modules/material/common-material.module';
import { CharacterFilterInputComponent } from '../../../shared/character-filter-input/character-filter-input.component';
import { RouterLink } from '@angular/router';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';
import { FormsModule } from '@angular/forms';
import { FilterFn } from '../../../shared/character-filter-input/models/filter-fn.type';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonMaterialModule,
    CharacterFilterInputComponent,
    CustomTableComponent,
    RouterLink,
    FormsModule
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
  filterValues = {
    name: '',
    status: '',
    species: ''
  };
  statuses = ['Alive', 'Dead', 'unknown'];
  speciesList = ['Human', 'Alien', 'unknown'];

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
      this.dataSource.filterPredicate = this.createFilter();
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

  applyFilter(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clearFilter(): void {
    this.filterValues = {
      name: '',
      status: '',
      species: ''
    };
    this.applyFilter();
  }

  createFilter(): FilterFn<Character> {
    return (data, filter) => {
      const filterValues = JSON.parse(filter);
      return this.matchesByText(data.name, filterValues.name) &&
             this.matchesBySelect(data.status, filterValues.status) &&
             this.matchesBySelect(data.species, filterValues.species)
    };
  }

  private matchesByText(data: string, textFilter: string): boolean {
    return !textFilter || data.toLowerCase().includes(textFilter.toLowerCase());
  }

  private matchesBySelect(data: string, textFilter: string) : boolean {
    return !textFilter || data === textFilter;
  }
}
