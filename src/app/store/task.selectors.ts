// src/app/store/task.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTodos = createSelector(
  selectTaskState,
  (state) => state.todos
);
