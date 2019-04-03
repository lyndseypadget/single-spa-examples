import {Component, NgZone, Inject} from '@angular/core';
import {showFrameworkObservable, getBorder} from '../common/colored-border.js';
import {Todo} from './todo.ts';
import {TodoDataService} from './todo-data.service.ts';

@Component({
  selector: 'scarecrow-todolist',
  template: `
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
  `,
  providers: [TodoDataService]
})
export class TodoList {
  public border:String;
  public showFramework:Boolean;
  public todos = [new Todo({title:'task1',completed:false,editing:false})];
  subscription: any;
  ngZone: any;

  constructor(@Inject(NgZone) ngZone:NgZone) {
    this.showFramework = false;
    this.ngZone = ngZone;
  }

  ngOnInit() {
    this.subscription = showFrameworkObservable.subscribe(showFramework => {
      this.ngZone.run(() => {
        this.border = showFramework ? getBorder('angular') : ``;
        this.showFramework = showFramework;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.dispose();
  }
}
