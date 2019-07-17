import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TodoList} from './scarecrow-todolist.component.ts';
import {enableProdMode} from '@angular/core';
import { FormsModule } from '@angular/forms';

try {
    enableProdMode();
} catch (err) {
    console.info('EnableProdMode already set')
}

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [TodoList],
    bootstrap: [TodoList]
})
export default class MainModule {
}
