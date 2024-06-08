import { createAction, props } from '@ngrx/store';
import { LoadCharacters, LoadCharactersFailed, LoadCharactersSuccess } from './types.action';
import { Character } from '../../models/character.model';

export const loadCharacters = createAction(LoadCharacters);
export const loadCharactersSuccess = createAction(LoadCharactersSuccess, props<{ characters: Character[] }>());
export const loadCharactersFailure = createAction(LoadCharactersFailed, props<{ error: any }>());
