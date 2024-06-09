import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CharacterService } from '../../../pages/character-list/services/character.service';
import {
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  loadCharsPage,
  loadCharsPageFailure,
  loadCharsPageSuccess,
} from '../actions/characters/characters.action';
import { of } from 'rxjs';
import { Character } from '../../models/character.interface';
import { ApiCharacter } from '../../models/api-character.interface';

@Injectable()
export class CharactersEffects {
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
      ofType(loadCharsPage),
      switchMap((res) =>
        this.characterService.getCharactersByPage(res.pageUrl).pipe(
          map((data) => {
            const modified = this.setLength(data);
            return loadCharsPageSuccess({ data: modified });
          }),
          catchError((error) => of(loadCharsPageFailure({ error })))
        )
      )
    )
  );

  setLength(data: ApiCharacter) {
    return {
      ...data,
      results: data.results.map((character: Character) => ({
        ...character,
        episodes: character.episode.length,
      })),
    };
  }
}
