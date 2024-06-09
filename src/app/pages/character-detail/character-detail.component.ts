import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Character } from '../../core/models/character.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  selectCharacterById,
  selectSelectedCharacter,
} from '../../core/store/selectors/characters.selectors';
import { LocationStrategy } from '@angular/common';
import { loadCharacterDetail } from '../../core/store/actions/characters/characters.action';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonMaterialModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character$!: Observable<Character | null | undefined>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private location: LocationStrategy
  ) {}

  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.store.select(selectCharacterById(id)).pipe(
          switchMap((character) => {
            if (character) {
              return [character];
            } else {
              this.store.dispatch(loadCharacterDetail({ characterId: id }));
              return this.store.select(selectSelectedCharacter);
            }
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  back() {
    this.location.back();
  }
}
