<template>
    <div class='row long-thin'>
        <div>Question</div>
        <div>🔒Deck</div>
    </div>
    <div class='row long-thin'>
        <textarea
            v-model='card.question'
            placeholder='Enter question text (Markdown)'
            style='resize:vertical;'
        ></textarea>
        <select v-model="card.deck.name">
            <option disabled value="">Select a deck</option>
            <option disabled
                v-for='deckopt in decks'
                v-bind:key='deckopt.id'
            >{{ deckopt.name }}</option>
        </select>
    </div><br>
    <div class='row long-thin'>
        <div>Answer(s)</div>
    </div>
    <div class='row long-thin'>
        <div>
            <textarea
                v-for='(answer,index) in card.answers'
                v-bind:key='index'
                v-model='card.answers[index]'
                placeholder='Enter answer text (Markdown)'
                style='width:98%;resize:vertical;margin-bottom:1em;'
            ></textarea>
            <button
                v-on:click='add_answer'
                style='font-size:11.5px;width:100%;'
            >Add answer</button>
        </div>
        <div class='col' style='grid-template-rows:2fr 1fr;'>
            <button
                v-on:click='submit_card'
                style='font-size:11.5px'
            >Update card</button>
            <button
                v-on:click='delete_card'
                style='font-size:11.5px;background:red;color:white'
            >Delete card</button>
        </div>
    </div>
</template>

<script>
import config from '../../config.js'
import * as util from '../mixin.js'

let api_url = config.api_url;

const mixin = {
    methods: util
}

export default {
    name: 'UpdateCard',
    mixins: [mixin],
    props: {
        update_card: {
            required: true,
            type: Object
        },
        decks: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
        }
    },
    methods: {
        submit_card() {
            return this.http_post(api_url+'/update_card', {
                card_id: this.card.id,
                question: this.card.question,
                answers: this.card.answers,
            }, () => {
                this.$emit('update-card-post');
            });
        },
        delete_card() {
            return this.http_delete(api_url+'/delete_card/'+this.update_card.id, () => {
                this.$emit('update-card-post');
                console.log('Card '+this.update_card.id+' deleted.');
            });
        },
        add_answer() {
            console.log(this.answers);
            this.answers.push('');
        },
    },
    computed: {
        card() {
            return {...this.update_card}
        },
    },
}
</script>

<style scoped>
.study-input {
    margin-top: 1.2em;
    grid-template-columns: 6fr 1fr;
}

.study-answer {
    margin-top: 2em;
}

.long-thin {
    grid-template-columns: 3fr 1fr;
}
</style>

