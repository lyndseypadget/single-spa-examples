import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import ClearCompleted from './lion-clearcompleted.component.js';
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

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
