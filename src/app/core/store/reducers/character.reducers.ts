import { createReducer, on } from "@ngrx/store";
import { Character } from "../../models/character.interface";
import { loadCharacters, loadCharactersFailure, loadCharactersSuccess, loadPage, loadPageFailure, loadPageSuccess } from "../actions/character.action";
import { Info } from "../../models/info.interface";

export interface CharacterState {
  loading: boolean
  info: Info | null;
  characters: Character[];
  error: any;
}

export const initialState: CharacterState = {
  loading: true,
  info: null,
  characters: [],
  error: null,
};

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, state => ({ ...state, loading: true })),
  on(loadCharactersSuccess, (state, { data }) => ({ ...state, characters: data.results, info: data.info, loading: false })),
  on(loadCharactersFailure, (state, { error }) => ({ ...state, error })),

  on(loadPage, state => ({ ...state, loading: true })),
  on(loadPageSuccess, (state, { data }) => ({ ...state, characters: [...state.characters, ...data.results], info: data.info, loading: false })),
  on(loadPageFailure, (state, { error }) => ({ ...state, error }))
);
