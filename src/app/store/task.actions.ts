// src/app/store/task.actions.ts
/*
export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public description: string) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove';
  constructor(public id: number) {}
}

export class ToggleTodo {
  static readonly type = '[Todo] Toggle';
  constructor(public id: number) {}
}

export class MarkAllCompleted {
  static readonly type = '[Todo] Mark All Completed';
}

export class ClearCompleted {
  static readonly type = '[Todo] Clear Completed';
}
*/

import { createAction, props } from "@ngrx/store";


export const addTodo = createAction(
  '[Todo] Add',
  props<{ description: string }>()
);

export const removeTodo = createAction(
  '[Todo] Remove',
  props<{ id: number }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle',
  props<{ id: number }>()
);

export const markAllCompleted = createAction('[Todo] Mark All Completed');

export const clearCompleted = createAction('[Todo] Clear Completed');
