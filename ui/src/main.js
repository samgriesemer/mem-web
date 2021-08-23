import { createApp } from 'vue'
import App from './App.vue'

import CardAnswer from './components/CardAnswer.vue'
import CardQuestion from './components/CardQuestion.vue'

const app = createApp(App);
app.config.compilerOptions.delimiters = ['${', '}'];

app.component('CardAnswer', CardAnswer);
app.component('CardQuestion', CardQuestion);

app.mount('#app')
