import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CharacterEffects } from './core/store/effects/character.effects';
import { characterReducer } from './core/store/reducers/character.reducers';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ characters: characterReducer }),
    provideEffects(CharacterEffects),
    provideHttpClient(withInterceptors([ErrorHandlerInterceptor, SpinnerInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
