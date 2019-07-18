import Vue from 'vue';
import './lion-removetodo.styles.css';

export default {
  template: `<button class="destroy lion" @click="removeTodo()"></button>`,
  replace: true,
  props: ['removetodo_idx'],
  methods: {
    removeTodo: function (id) {
      console.log('I am sending the removeTodo message from Lion (Vue) with id '+this.removetodo_idx+'!');
      let event = new CustomEvent('removetodo', {
        detail: {
          id: this.removetodo_idx
        }
      });
      window.dispatchEvent(event);
    }
  }
};
