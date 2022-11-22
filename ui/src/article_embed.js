import { createApp } from 'vue'
import ArticleEmbed from './ArticleEmbed.vue'

import CardAnswer from './components/CardAnswer.vue'
import CardQuestion from './components/CardQuestion.vue'

const app = createApp(ArticleEmbed, {
    primary_deck: document.location.pathname.substring(1),
    deck_list   : [],
});
app.config.compilerOptions.delimiters = ['${', '}'];

app.component('CardAnswer', CardAnswer);
app.component('CardQuestion', CardQuestion);

app.mount('#mem-embed')
