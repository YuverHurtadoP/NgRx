/*
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddTodo, RemoveTodo, ToggleTodo, MarkAllCompleted, ClearCompleted } from './task.actions';
import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

export interface TaskStateModel {
  todos: Todo[];
}

@Injectable()
@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    todos: []
  }
})
export class TaskState {
  @Selector()
  static getTodos(state: TaskStateModel) {
    return state.todos;
  }

  @Action(AddTodo)
  add(ctx: StateContext<TaskStateModel>, action: AddTodo) {
    const state = ctx.getState();
    const newTodo: Todo = {
      id: state.todos.length ? Math.max(...state.todos.map(t => t.id)) + 1 : 1,
      description: action.description,
      completed: false
    };
    ctx.patchState({ todos: [...state.todos, newTodo] });
  }

  @Action(RemoveTodo)
  remove(ctx: StateContext<TaskStateModel>, action: RemoveTodo) {
    const state = ctx.getState();
    ctx.patchState({ todos: state.todos.filter(t => t.id !== action.id) });
  }

  @Action(ToggleTodo)
  toggle(ctx: StateContext<TaskStateModel>, action: ToggleTodo) {
    const state = ctx.getState();
    ctx.patchState({
      todos: state.todos.map(t =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      )
    });
  }

  @Action(MarkAllCompleted)
  markAll(ctx: StateContext<TaskStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      todos: state.todos.map(t => ({ ...t, completed: true }))
    });
  }

  @Action(ClearCompleted)
  clear(ctx: StateContext<TaskStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      todos: state.todos.filter(t => !t.completed)
    });
  }
}
*/

// src/app/store/task.reducer.ts
// Importamos funciones de NgRx para crear un reducer y manejar acciones
import { createReducer, on } from '@ngrx/store';

// Importamos las acciones que definimos para manejar nuestros TODOs
import { addTodo, removeTodo, toggleTodo, markAllCompleted, clearCompleted } from './task.actions';

// Definimos la interfaz de un TODO
export interface Todo {
  id: number;           // Identificador único de cada tarea
  description: string;  // Texto de la tarea
  completed: boolean;   // Indica si la tarea está completada o no
}

// Definimos la interfaz del estado del reducer
export interface TaskState {
  todos: Todo[];        // Lista de tareas
}

// Estado inicial del reducer
export const initialState: TaskState = {
  todos: []             // Al iniciar no hay tareas
};

// Creamos el reducer usando createReducer
export const taskReducer = createReducer(
  initialState,         // Estado inicial del reducer

  // Maneja la acción addTodo
  on(addTodo, (state, { description }) => ({
    ...state,           // Copiamos el estado actual para mantener inmutabilidad
    todos: [
      ...state.todos,   // Copiamos todas las tareas existentes
      {
        // Generamos un nuevo id: si ya hay tareas, tomamos el mayor y sumamos 1; si no, empieza en 1
        id: state.todos.length ? Math.max(...state.todos.map(t => t.id)) + 1 : 1,
        description,    // Asignamos la descripción enviada por la acción
        completed: false // Por defecto, la nueva tarea no está completada
      }
    ]
  })),

  // Maneja la acción removeTodo
  on(removeTodo, (state, { id }) => ({
    ...state,                // Copiamos el estado actual
    todos: state.todos.filter(t => t.id !== id) // Filtramos la tarea que queremos eliminar
  })),

  // Maneja la acción toggleTodo
  on(toggleTodo, (state, { id }) => ({
    ...state,                // Copiamos el estado
    todos: state.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t // Si es la tarea indicada, invertimos su estado
    )
  })),

  // Maneja la acción markAllCompleted
  on(markAllCompleted, (state) => ({
    ...state,                // Copiamos el estado
    todos: state.todos.map(t => ({ ...t, completed: true })) // Marcamos todas las tareas como completadas
  })),

  // Maneja la acción clearCompleted
  on(clearCompleted, (state) => ({
    ...state,                // Copiamos el estado
    todos: state.todos.filter(t => !t.completed) // Eliminamos todas las tareas completadas
  }))
);
