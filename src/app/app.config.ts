import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { taskReducer } from './store/task.reducer';
import { provideStore } from '@ngrx/store';
/*
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([TaskState], { developmentMode: true }), NgxsLoggerPluginModule.forRoot()), provideStore()]
};*/
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     provideStore({ tasks: taskReducer }), provideEffects([TaskEffects]),   importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,        // guarda hasta 25 acciones
        logOnly: false,    // permite dispatch y time-travel en dev
        autoPause: true,   // pausa cuando no está activo
      })
    )]
};
