import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CharactersEffects } from './core/store/effects/characters.effects';
import { charactersReducer } from './core/store/reducers/characters.reducers';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EpisodeEffects } from './core/store/effects/episodes.effects';
import { episodeReducer } from './core/store/reducers/episodes.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({ characters: charactersReducer, episodes: episodeReducer }),
    provideEffects(CharactersEffects, EpisodeEffects),
    provideHttpClient(withInterceptors([ErrorHandlerInterceptor, SpinnerInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
]
};
