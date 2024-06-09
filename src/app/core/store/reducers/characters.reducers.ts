import { createReducer, on } from "@ngrx/store";
import { Character } from "../../models/character.interface";
import { loadCharacters, loadCharactersFailure, loadCharactersSuccess, loadCharsPage, loadCharsPageFailure, loadCharsPageSuccess } from "../actions/characters/characters.action";
import { Info } from "../../models/info.interface";

export interface CharactersState {
  loading: boolean
  info: Info | null;
  characters: Character[];
  error: any;
}

export const initialState: CharactersState = {
  loading: true,
  info: null,
  characters: [],
  error: null,
};

export const charactersReducer = createReducer(
  initialState,
  on(loadCharacters, state => ({ ...state, loading: true })),
  on(loadCharactersSuccess, (state, { data }) => ({ ...state, characters: data.results, info: data.info, loading: false })),
  on(loadCharactersFailure, (state, { error }) => ({ ...state, error })),

  on(loadCharsPage, state => ({ ...state, loading: true })),
  on(loadCharsPageSuccess, (state, { data }) => ({ ...state, characters: [...state.characters, ...data.results], info: data.info, loading: false })),
  on(loadCharsPageFailure, (state, { error }) => ({ ...state, error }))
);
