import { createReducer, on } from '@ngrx/store';
import { loadEpisodes, loadEpisodesSuccess, loadEpisodesFailure, loadEpisodeDetail, loadEpisodeDetailSuccess, loadEpisodeDetailFailure, loadEpisodesPage, loadEpisodesPageSuccess, loadEpisodesPageFailure } from '../actions/episodes/episodes.action';
import { Episode } from '../../models/episode.interface';
import { Info } from '../../models/info.interface';

export interface EpisodeState {
  loading: boolean;
  episodes: Episode[];
  info: Info | null;
  selectedEpisode: Episode | null;
  error: any;
}

export const initialState: EpisodeState = {
  loading: false,
  episodes: [],
  info: null,
  selectedEpisode: null,
  error: null,
};

export const episodeReducer = createReducer(
  initialState,
  on(loadEpisodes, (state) => ({ ...state, loading: true })),
  on(loadEpisodesSuccess, (state, { data }) => ({ ...state, episodes: data.results, info: data.info, loading: false })),
  on(loadEpisodesFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(loadEpisodesPage, state => ({ ...state, loading: true })),
  on(loadEpisodesPageSuccess, (state, { data }) => ({ ...state, episodes: [...state.episodes, ...data.results], info: data.info, loading: false })),
  on(loadEpisodesPageFailure, (state, { error }) => ({ ...state, error })),

  on(loadEpisodeDetail, (state) => ({ ...state, loading: true, selectedEpisode: null })),
  on(loadEpisodeDetailSuccess, (state, { episode }) => ({ ...state, selectedEpisode: episode, loading: false })),
  on(loadEpisodeDetailFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
