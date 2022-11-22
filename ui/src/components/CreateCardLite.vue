<template>
    <div class='row long-thin'>
        <div>Question</div>
        <div>Deck</div>
    </div>
    <div class='row long-thin'>
        <textarea
            v-model='question'
            placeholder='Enter question text (Markdown)'
            style='resize:vertical;'
        ></textarea>
        <select v-if='lock_deck' v-model="deck_name">
            <option disabled value="">{{ lock_deck.name }}</option>
        </select>
        <select v-else v-model="deck_name">
            <option disabled value="">Select a deck</option>
            <option
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
                v-for='(answer,index) in answers'
                v-bind:key='index'
                v-model='answers[index]'
                placeholder='Enter answer text (Markdown)'
                style='width:98%;resize:vertical;margin-bottom:1em;'
            ></textarea>
            <button
                v-on:click='add_answer'
                style='font-size:11.5px;width:100%;margin-bottom:0.5em;'
            >Add answer</button><br>
            <button
                v-on:click='del_answer'
                style='font-size:11.5px;width:100%;'
            >Delete answer</button>
        </div>
        <button
            v-on:click='submit_card'
            style='font-size:11.5px'
        >Create card</button>
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
    name: 'CreateCard',
    mixins: [mixin],
    props: {
        decks: {
            required: true,
            type: Array
        },
        lock_deck: {
            required: false,
            type: Object
        },
    },
    data() {
        return {
            question: '',
            answers: [],
            deck_name: '',
        }
    },
    methods: {
        submit_card() {
            return this.http_post(api_url+'/create_card', {
                deck: this.lock_deck ? this.lock_deck.name : this.deck_name,
                question: this.question,
                answers: this.answers,
                create_deck: true,
            }, (d) => {
                console.log(d);
                this.$emit('create-card-post');
                this.question  = '';
                this.answers   = [];
                this.deck_name = '';
            });
        },
        add_answer() {
            console.log(this.answers);
            this.answers.push('');
        },
        del_answer() {
            console.log(this.answers);
            this.answers.pop('');
        }
    }
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

