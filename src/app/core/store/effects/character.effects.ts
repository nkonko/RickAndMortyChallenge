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
import { Character } from '../../models/character.interface';
import { ApiData } from '../../models/api-data.interface';

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
          map((data) => {
            const modified = this.setLength(data);
            return loadCharactersSuccess({ data: modified });
          }),
          catchError((error) => of(loadCharactersFailure({ error })))
        )
      )
    )
  );

  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPage),
      switchMap((res) =>
        this.characterService.getCharactersByPage(res.pageUrl).pipe(
          map((data) => {
            const modified = this.setLength(data);
            return loadPageSuccess({ data: modified });
          }),
          catchError((error) => of(loadPageFailure({ error })))
        )
      )
    )
  );

  setLength(data: ApiData) {
    return {
      ...data,
      results: data.results.map((character: Character) => ({
        ...character,
        episodes: character.episode.length,
      })),
    };
  }
}
