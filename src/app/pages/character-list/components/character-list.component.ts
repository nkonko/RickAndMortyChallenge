import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { loadCharacters } from '../../../core/store/actions/character.action';
import { Character } from '../../../core/models/character.model';
import { selectCharacters } from '../../../core/store/selectors/character.selectors';


@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    FlexLayoutModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})

export class CharacterListComponent implements OnInit, OnDestroy {
  characters$: Observable<Character[]>;
  dataSource = new MatTableDataSource<Character>();
  displayedColumns: string[] = ['image', 'name', 'status', 'species', 'episodes'];
  unsuscribe$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) {
    this.characters$ = this.store.select(selectCharacters);
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  ngOnInit(): void {
    this.characters$.pipe(
      takeUntil(this.unsuscribe$),
      map(characters => new MatTableDataSource(characters || []) ),
      catchError(() => of(new MatTableDataSource([])))
    );
    this.store.dispatch(loadCharacters());
  }

}
