import { Character } from "./character.interface";
import { Info } from "./info.interface";

export interface ApiData {
  info: Info,
  results: Character[]
}
