import { createAction, props } from '@ngrx/store';
import { LOAD_CHARACTERS, LOAD_CHARACTERS_FAILED, LOAD_CHARACTERS_SUCCESS, LOAD_PAGE_CHARACTERS, LOAD_PAGE_CHARACTERS_FAILED, LOAD_PAGE_CHARACTERS_SUCCESS } from './characters-types.action';
import { ApiCharacter } from '../../../models/api-character.interface';

export const loadCharacters = createAction(LOAD_CHARACTERS);
export const loadCharactersSuccess = createAction(LOAD_CHARACTERS_SUCCESS, props<{ data: ApiCharacter }>());
export const loadCharactersFailure = createAction(LOAD_CHARACTERS_FAILED, props<{ error: any }>());

export const loadCharsPage = createAction(LOAD_PAGE_CHARACTERS , props<{ pageUrl: string }>())
export const loadCharsPageSuccess = createAction(LOAD_PAGE_CHARACTERS_SUCCESS , props<{ data: ApiCharacter }>())
export const loadCharsPageFailure = createAction(LOAD_PAGE_CHARACTERS_FAILED , props<{ error: any }>())
