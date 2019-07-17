import {Component, NgZone, Inject} from '@angular/core';
import {showFrameworkObservable, getBorder} from '../common/colored-border.js';
import {Todo} from './todo.ts';
import {TodoDataService} from './todo-data.service.ts';

@Component({
  selector: 'scarecrow-todolist',
  template: `
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus="" [(ngModel)]="newTodo.title" (keyup.enter)="addTodo()">
    </header>
    <section class="main" *ngIf="todos.length > 0">
      <ul class="todo-list">
        <li *ngFor="let todo of todos" [class.completed]="todo.complete" [class.editing]="todo.editing">
          <div class="view">
            <input class="toggle" type="checkbox" (click)="toggleTodoComplete(todo)" [checked]="todo.complete">
            <label (dblclick)="editTodo(todo)">{{todo.title}}</label>
            <button class="destroy" (click)="removeTodo(todo)"></button>
          </div>
          <input class="edit" *ngIf="todo.editing" [value]="todo.title" #editedtodo (blur)="stopEditing(todo, editedtodo.value)" (keyup.enter)="updateEditingTodo(todo, editedtodo.value)" (keyup.escape)="cancelEditingTodo(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer" *ngIf="todos.length > 0">
      <span class="todo-count"><strong>{{todos.length}}</strong> {{todos.length == 1 ? 'item' : 'items'}} left</span>
    </footer>
  </section>

  `,
  providers: [TodoDataService]
})
export class TodoList {
  public border:String;
  public showFramework:Boolean;
  public todos = [];
  subscription: any;
  ngZone: any;

  constructor(@Inject(NgZone) ngZone:NgZone, private todoDataService: TodoDataService) {
    this.showFramework = false;
    this.ngZone = ngZone;

    //FIXME: we shouldn't have to do this but for some reason the provider injection isn't working
    this.todoDataService = new TodoDataService();

    this.todos = this.todoDataService.getAllTodos();

    // console.log('CONSTRUCTOR', this.todoDataService);
  }

  ngOnInit() {
    this.subscription = showFrameworkObservable.subscribe(showFramework => {
      this.ngZone.run(() => {
        this.border = showFramework ? getBorder('angular') : ``;
        this.showFramework = showFramework;
      });
    });

    window.addEventListener('clearcompleted', function(e) {
      console.log('I received the message in Scarecrow (Angular)!');
      this.removeComplete();
      this.refreshView();
    }.bind(this), false);

    // we can't do this, we have to bind
    // window.addEventListener('clearcompleted', this.removeComplete);
  }

  ngOnDestroy() {
    this.subscription.dispose();
  }


  newTodo: Todo = new Todo();

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  getCompleteCount() {
    return this.todoDataService.getComplete().length;
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);

    //forcibly update
    this.todos = this.todoDataService.getAllTodos();

    // this.refreshView();
  }

  removeComplete() {
    console.log('removing completed todos...');
    this.todoDataService.removeComplete();

    //forcibly update
    this.todos = this.todoDataService.getAllTodos();
  }

  refreshView() {
    this.ngZone.run(() => {});
  }

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
    this.todoDataService.updateTodoById(todo.id, todo);
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoDataService.remove(todo);
		}

		todo.title = editedTitle;
    this.todoDataService.updateTodoById(todo.id, todo);
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

}
