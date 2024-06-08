import { createAction, props } from '@ngrx/store';
import { LoadCharacters, LoadCharactersFailed, LoadCharactersSuccess, LoadPage, LoadPageFailed, LoadPageSuccess } from './types.action';
import { ApiData } from '../../models/api-data.interface';

export const loadCharacters = createAction(LoadCharacters);
export const loadCharactersSuccess = createAction(LoadCharactersSuccess, props<{ data: ApiData }>());
export const loadCharactersFailure = createAction(LoadCharactersFailed, props<{ error: any }>());

export const loadPage = createAction(LoadPage , props<{ pageUrl: string }>())
export const loadPageSuccess = createAction(LoadPageSuccess , props<{ data: ApiData }>())
export const loadPageFailure = createAction(LoadPageFailed , props<{ error: any }>())
