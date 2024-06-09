import { Character } from "./character.interface";
import { Info } from "./info.interface";

export interface ApiCharacter {
  info: Info,
  results: Character[]
}
