import Vue from 'vue';
import './lion-removetodo.styles.css';

export default {
  template: `<button class="destroy lion" @click="removeTodo()"></button>`,
  replace: true,
  props: [],
  methods: {
    removeTodo: function (id) {

      console.log('I am sending the removeTodo message from Lion (Vue)!');
      let event = new CustomEvent('removetodo', {
        detail: {
          id: this.$el.closest('.view').getAttribute('id')
        }
      });
      window.dispatchEvent(event);
    }
  }
};
