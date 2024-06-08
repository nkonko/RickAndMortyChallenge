import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CharacterState } from "../reducers/character.reducers";

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const selectCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characters
);
