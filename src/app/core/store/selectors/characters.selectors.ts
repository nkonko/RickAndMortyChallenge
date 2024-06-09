import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CharactersState } from "../reducers/characters.reducers";
import { Character } from "../../models/character.interface";

export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharacters = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.characters
);

export const selectCharacterById = (characterId: number) => createSelector(
  selectCharacters,
  (characters: Character[]) => characters.find(character => character.id === characterId)
);

export const selectCharactersPages = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.info!
);
