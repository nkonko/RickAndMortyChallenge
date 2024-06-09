import { Episode } from "./episode.interface";
import { Info } from "./info.interface";


export interface ApiEpisode {
  info: Info,
  results: Episode[]
}
