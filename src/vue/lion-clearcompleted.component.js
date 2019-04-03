import Vue from 'vue';
import './lion-clearcompleted.styles.css';

export default {
  template: `<button class="clear-completed lion" @click="clearcompleted()">Clear completed</button>`,
  replace: true,
  props: ['clearcompleted-todos'],
  methods: {
    clearcompleted: function () {
      console.log('calling clearcompleted in lion/vue');
      let modifiedTodos = this.clearcompletedTodos.filter(function (todo) {
        return !todo.completed;
      });
      // this.$emit('new-todos', modifiedTodos)
      this.dispatchEvent(new CustomEvent('clearcompleted'));
    }
  }
};
