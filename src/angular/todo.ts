export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;
  editing: boolean = false;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
