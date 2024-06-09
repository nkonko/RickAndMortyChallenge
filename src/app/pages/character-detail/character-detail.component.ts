import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Character } from '../../core/models/character.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { selectCharactersById } from '../../core/store/selectors/character.selectors';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonMaterialModule, RouterLink],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character$!: Observable<Character | undefined>;
  unsuscribe$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute, private location: LocationStrategy) {}

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      takeUntil(this.unsuscribe$),
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.store.select(selectCharactersById(id));
      })
    );
  }

  back() {
    this.location.back();
  }
}
