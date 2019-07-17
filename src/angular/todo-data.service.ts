import {Injectable} from '@angular/core';
import {Todo} from './todo.ts';

@Injectable()
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  todos: Todo[] = [];

  constructor() {
    let persistedTodos = JSON.parse(localStorage.getItem('@angular-todos') || '[]');
    this.todos = persistedTodos;
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
		this.updateStore();
    return this;
  }

  remove(todo: Todo) {
    this.deleteTodoById(todo.id);
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    id = Number(id); // just in case
    this.todos = this.todos
      .filter(todo => todo.id !== id);
  	this.updateStore();
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    (<any>Object).assign(todo, values);
		this.updateStore();
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
		this.updateStore();
    return updatedTodo;
  }

  getComplete() {
    return this.todos.filter((todo: Todo) => todo.complete === true);
  }

  removeComplete() {
    this.todos = this.todos.filter((todo: Todo) => todo.complete === false);
    this.updateStore();
  }

	private updateStore() {
    this.todos.forEach(t => t.editing = false);
		localStorage.setItem('@angular-todos', JSON.stringify(this.todos));
	}

}
