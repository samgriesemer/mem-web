import { createApp } from 'vue'
import AppSlim from './AppSlim.vue'

import CardAnswer from './components/CardAnswer.vue'
import CardQuestion from './components/CardQuestion.vue'

const app = createApp(AppSlim);
app.config.compilerOptions.delimiters = ['${', '}'];

app.component('CardAnswer', CardAnswer);
app.component('CardQuestion', CardQuestion);

app.mount('#app-slim')
