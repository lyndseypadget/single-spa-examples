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

let els = document.getElementsByClassName('lion-removetodo');
let removeTodoVueLifecycles = [];
for(var i = 0; i < els.length; i++) {
  var el = els.item(i);

  let spa = singleSpaVue({
    Vue,
    appOptions: {
      el: el,
      template: `
        <lion-removetodo v-bind:removetodo_idx="i"></lion-removetodo>
      `,
      components: {
        'lion-removetodo': RemoveTodo,
      },
      data: {
        i: el.closest('.view').getAttribute('id')
      },
      beforeMount: function() {
      },
      beforeDestroy: function() {
      }
    }
  });
  removeTodoVueLifecycles.push(spa);
}

export const bootstrap = [
  vueLifecycles.bootstrap,
];
removeTodoVueLifecycles.forEach((lc) => {
  bootstrap.push(lc.bootstrap);
})

export const mount = [
  vueLifecycles.mount,
];
removeTodoVueLifecycles.forEach((lc) => {
  bootstrap.push(lc.mount);
})

export const unmount = [
  vueLifecycles.unmount,
];
removeTodoVueLifecycles.forEach((lc) => {
  bootstrap.push(lc.unmount);
})
