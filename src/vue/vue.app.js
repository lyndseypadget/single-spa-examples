import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import ClearCompleted from './lion-clearcompleted.component.js';
import RemoveTodo from './lion-removetodo.component.js';
import {showFrameworkObservable, getBorder} from 'src/common/colored-border.js';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue-app',
    template: `
      <lion-clearcompleted v-bind:clearcompleted-todos="todos"></lion-clearcompleted>
    `,
    components: {
      'lion-clearcompleted': ClearCompleted,
    },
    data: {
      todos: []
    },
    beforeMount: function() {
    },
    beforeDestroy: function() {
    }
  }
});


const vueLifecycles2 = singleSpaVue({
  Vue,
  appOptions: {
    el: '#lion-removetodo',
    template: `
      <lion-removetodo></lion-removetodo>
    `,
    components: {
      'lion-removetodo': RemoveTodo,
    },
    data: {
    },
    beforeMount: function() {
    },
    beforeDestroy: function() {
    }
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
  vueLifecycles2.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
  vueLifecycles2.mount,
];

export const unmount = [
  vueLifecycles.unmount,
  vueLifecycles2.unmount,
];
