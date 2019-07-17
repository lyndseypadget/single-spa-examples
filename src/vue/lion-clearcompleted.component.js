import Vue from 'vue';
import './lion-clearcompleted.styles.css';

export default {
  template: `<button class="clear-completed lion" @click="clearcompleted()">Clear completed</button>`,
  replace: true,
  props: ['clearcompleted-todos'],
  methods: {
    clearcompleted: function () {
      console.log('I am sending the clearcompleted message from Lion (Vue)!');
      window.dispatchEvent(new CustomEvent('clearcompleted'));
    }
  }
};
