import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CharacterService } from '../../../pages/character-list/services/character.service';
import {
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  loadPage,
  loadPageFailure,
  loadPageSuccess,
} from '../actions/character.action';
import { of } from 'rxjs';

@Injectable()
export class CharacterEffects {
  constructor(
    private actions$: Actions,
    private characterService: CharacterService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(() =>
        this.characterService.getCharacters().pipe(
          map((data) => loadCharactersSuccess({ data })),
          catchError((error) => of(loadCharactersFailure({ error })))
        )
      )
    )
  );

  loadPage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadPage),
    switchMap((res) => this.characterService.getCharactersByPage(res.pageUrl).pipe(
      map((data) => loadPageSuccess({data})),
      catchError((error) => of(loadPageFailure({ error })))
    )
  )
  ))
}
