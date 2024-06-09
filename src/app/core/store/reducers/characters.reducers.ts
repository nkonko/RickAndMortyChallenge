import { createReducer, on } from "@ngrx/store";
import { Character } from "../../models/character.interface";
import { loadCharacterDetail, loadCharacterDetailFailure, loadCharacterDetailSuccess, loadCharacters, loadCharactersFailure, loadCharactersSuccess, loadCharsPage, loadCharsPageFailure, loadCharsPageSuccess } from "../actions/characters/characters.action";
import { Info } from "../../models/info.interface";

export interface CharactersState {
  loading: boolean
  info: Info | null;
  characters: Character[];
  selectedCharacter: Character | null;
  error: any;
}

export const initialState: CharactersState = {
  loading: false,
  info: null,
  characters: [],
  selectedCharacter: null,
  error: null,
};

export const charactersReducer = createReducer(
  initialState,
  on(loadCharacters, state => ({ ...state, loading: true })),
  on(loadCharactersSuccess, (state, { data }) => ({ ...state, characters: data.results, info: data.info, loading: false })),
  on(loadCharactersFailure, (state, { error }) => ({ ...state, error })),

  on(loadCharsPage, state => ({ ...state, loading: true })),
  on(loadCharsPageSuccess, (state, { data }) => ({ ...state, characters: [...state.characters, ...data.results], info: data.info, loading: false })),
  on(loadCharsPageFailure, (state, { error }) => ({ ...state, error })),

  on(loadCharacterDetail, (state) => ({ ...state, loading: true, selectedCharacter: null })),
  on(loadCharacterDetailSuccess, (state, { character }) => ({ ...state, selectedCharacter: character, loading: false })),
  on(loadCharacterDetailFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
