import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CharacterService } from '../../../pages/character-list/services/character.service';
import { loadCharacters, loadCharactersFailure, loadCharactersSuccess } from '../actions/character.action';
import { of } from 'rxjs';


@Injectable()
export class CharacterEffects {

constructor(private actions$: Actions,private characterService: CharacterService) {}

load$ = createEffect(() => this.actions$.pipe(
ofType(loadCharacters),
switchMap(() => this.characterService.getCharacters()
.pipe(
map(characters => loadCharactersSuccess({ characters })),
catchError(error => of(loadCharactersFailure({ error })))
))));
}
