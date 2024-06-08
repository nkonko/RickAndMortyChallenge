import { createReducer, on } from "@ngrx/store";
import { Character } from "../../models/character.model";
import { loadCharacters, loadCharactersFailure, loadCharactersSuccess } from "../actions/character.action";

export interface CharacterState {
  characters: Character[];
  error: any;
}

export const initialState: CharacterState = {
  characters: [],
  error: null,
};

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, state => ({ ...state })),
  on(loadCharactersSuccess, (state, { characters }) => ({ ...state, characters })),
  on(loadCharactersFailure, (state, { error }) => ({ ...state, error }))
);
