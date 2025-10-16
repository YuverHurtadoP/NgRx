/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TaskState } from '../../store/storeTask.state';
import { AddTodo, RemoveTodo, ToggleTodo, MarkAllCompleted, ClearCompleted } from '../../store/task.actions';
interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  todos$!: Observable<Todo[]>;



  newDescription = '';

  constructor(private store: Store) {

    this.todos$ = this.store.select(TaskState.getTodos);
  }

  addTodo(): void {
    const description = this.newDescription.trim();
    if (!description) return;

    this.store.dispatch(new AddTodo(description));
    this.newDescription = '';
  }

  removeTodo(id: number): void {
    this.store.dispatch(new RemoveTodo(id));
  }

  toggleComplete(id: number): void {
    this.store.dispatch(new ToggleTodo(id));
  }

  markAllCompleted(): void {
    this.store.dispatch(new MarkAllCompleted());
  }

  clearCompleted(): void {
    this.store.dispatch(new ClearCompleted());
  }


}
*/

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTodos } from '../../store/task.selectors';
import {
  addTodo,
  removeTodo,
  toggleTodo,
  markAllCompleted,
  clearCompleted
} from '../../store/task.actions';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  todos$!: Observable<Todo[]>;

  newDescription = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.todos$ = this.store.select(selectTodos);
  }

  addTodo(): void {
    const description = this.newDescription.trim();
    if (!description) return;

    this.store.dispatch(addTodo({ description }));
    this.newDescription = '';
  }

  removeTodo(id: number): void {
    this.store.dispatch(removeTodo({ id }));
  }

  toggleComplete(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  markAllCompleted(): void {
    this.store.dispatch(markAllCompleted());
  }

  clearCompleted(): void {
    this.store.dispatch(clearCompleted());
  }
}
