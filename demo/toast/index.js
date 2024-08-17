import Vue from 'vue';
import Toast from './Index.vue';

const Ctor = Vue.extend(Toast);
let hasInserted = false;

class _Toast {
  constructor(options) {
    this.options = options;
    this.instance = new Ctor(this.options).$mount();
  }

  show({ message = '', duration = 2000, callback }) {
    this.instance.message = message;
    this.instance.duration = duration;
    this.instance.callback = callback;
    if (hasInserted) {
      this.instance.show();
    } else {
      document.body.appendChild(this.instance.$el);
      Vue.nextTick(() => {
        this.instance.show();
      });
      hasInserted = true;
    }
  }
}

const toast = new _Toast();

export default toast;
