import { createAction, props } from '@ngrx/store';
import { LOAD_EPISODES, LOAD_EPISODES_FAILURE, LOAD_EPISODES_SUCCESS, LOAD_EPISODE_DETAIL, LOAD_EPISODE_DETAIL_FAILURE, LOAD_EPISODE_DETAIL_SUCCESS, LOAD_PAGE_EPISODES, LOAD_PAGE_EPISODES_FAILED, LOAD_PAGE_EPISODES_SUCCESS } from './episode-types.action';
import { ApiEpisode } from '../../../models/api-episode.interface';
import { Episode } from '../../../models/episode.interface';

export const loadEpisodes = createAction(LOAD_EPISODES);
export const loadEpisodesSuccess = createAction(LOAD_EPISODES_SUCCESS, props<{ data: ApiEpisode }>());
export const loadEpisodesFailure = createAction(LOAD_EPISODES_FAILURE, props<{ error: any }>());

export const loadEpisodesPage = createAction(LOAD_PAGE_EPISODES , props<{ pageUrl: string }>())
export const loadEpisodesPageSuccess = createAction(LOAD_PAGE_EPISODES_SUCCESS , props<{ data: ApiEpisode }>())
export const loadEpisodesPageFailure = createAction(LOAD_PAGE_EPISODES_FAILED , props<{ error: any }>())

export const loadEpisodeDetail = createAction(LOAD_EPISODE_DETAIL, props<{ episodeId: number }>());
export const loadEpisodeDetailSuccess = createAction(LOAD_EPISODE_DETAIL_SUCCESS, props<{ episode: Episode }>());
export const loadEpisodeDetailFailure = createAction(LOAD_EPISODE_DETAIL_FAILURE, props<{ error: any }>());
