import { App } from 'vue';

import Button from './components/Button.vue';
import Card from './components/Card.vue';
import InputGroup from './components/InputGroup.vue';

export default {
  install(app: App) {
    app.component('Card', Card);
    app.component('InputGroup', InputGroup),
    app.component('Button', Button)
  }
}