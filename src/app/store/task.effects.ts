import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  markAllCompleted,
  clearCompleted
} from './task.actions';

@Injectable()
export class TaskEffects {

  // ✅ Inyección moderna (sin constructor)
  private actions$ = inject(Actions);

  /** 🟢 Log: cuando se agrega una nueva tarea */
  logAddTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTodo),
        tap(action => console.log('🟢 Nueva tarea agregada:', action.description))
      ),
    { dispatch: false }
  );

  /** 🟡 Log: cuando se cambia el estado (completado / pendiente) */
  logToggleTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleTodo),
        tap(action => console.log('🟡 Tarea marcada/desmarcada:', action.id))
      ),
    { dispatch: false }
  );

  /** 🔴 Log: cuando se elimina una tarea */
  logRemoveTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeTodo),
        tap(action => console.log('🔴 Tarea eliminada:', action.id))
      ),
    { dispatch: false }
  );

  /** ✅ Log: cuando se marcan todas como completadas */
  logMarkAllCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(markAllCompleted),
        tap(() => console.log('✅ Todas las tareas marcadas como completadas'))
      ),
    { dispatch: false }
  );

  /** ⚪ Log: cuando se limpian las completadas */
  logClearCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearCompleted),
        tap(() => console.log('🧹 Tareas completadas eliminadas'))
      ),
    { dispatch: false }
  );
}
