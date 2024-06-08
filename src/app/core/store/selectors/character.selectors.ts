import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CharacterState } from "../reducers/character.reducers";
import { Character } from "../../models/character.interface";

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const selectCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characters
);

export const selectCharactersById = (characterId: number) => createSelector(
  selectCharacters,
  (characters: Character[]) => characters.find(character => character.id === characterId)
);

export const selectPages = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.info!
);
