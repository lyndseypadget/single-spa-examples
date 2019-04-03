import Vue from 'vue';
import './lion-clearcompleted.styles.css';

export default {
  template: `<button class="clear-completed lion" @click="removeCompleted()">Clear completed</button>`,
  replace: true,
  props: ['clearcompleted-todos'],
  methods: {
    removeCompleted: function () {
      let modifiedTodos = this.clearcompletedTodos.filter(function (todo) {
        return !todo.completed;
      });
      this.$emit('new-todos', modifiedTodos)
    }
  }
};
