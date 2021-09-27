<template>
    <!--<div class='row long-thin'>
        <div class='post-col'>
            <h1>Enter question</h1>
            <textarea
                v-model='question'
                placeholder='Enter question text (Markdown)'
            ></textarea>
        </div>
        <div class='post-col'>
            <h1>Deck name</h1>
            <textarea
                v-model='deck'
                placeholder='Enter deck to which card should be assigned'
            ></textarea>
        </div>
    </div>

    <div class='row-2'>
        <div class='post-col'>
            <h1>Enter answer(s)</h1>
            <textarea
                v-for='(answer,index) in answers'
                v-bind:key='index'
                v-model='answers[index]'
                placeholder='Enter answer text (Markdown)'
            ></textarea>
            <button
                v-on:click='add_answer'
                style='font-size:11.5px'
            >Add answer</button>
        </div>
        <div>
            <button
                v-on:click='submit_card'
                style='font-size:11.5px'
            >Create card</button>
        </div>
    </div>-->

    <!--<div class='row long-thin' style='padding-right:0.8em;'>
        <div>
            <div>Question</div>
            <textarea
                v-model='question'
                placeholder='Enter question text (Markdown)'
                style='width:100%;'
            ></textarea>
        </div>
        <div>
            <div>Deck</div>
            <textarea
                v-model='deck'
                placeholder='Enter deck to which card should be assigned'
                style='width:100%;'
            ></textarea>
        </div>
    </div><br>

    <div class='row long-thin'>
        <div>
            <div>Answer(s)</div>
            <textarea
                v-for='(answer,index) in answers'
                v-bind:key='index'
                v-model='answers[index]'
                placeholder='Enter answer text (Markdown)'
                style='width:100%;'
            ></textarea>
        </div>
        <button
            v-on:click='submit_card'
            style='font-size:11.5px'
        >Create card</button>
    </div>
    <button
        v-on:click='add_answer'
        style='font-size:11.5px'
    >Add answer</button>-->

    <!--<div class='row long-thin'>
        <div>
            <div>
                <div>Question</div>
                <textarea
                    v-model='question'
                    placeholder='Enter question text (Markdown)'
                    style='width:100%;resize:none;'
                ></textarea>
            </div>
            <div>
                <div>Answer(s)</div>
                <textarea
                    v-for='(answer,index) in answers'
                    v-bind:key='index'
                    v-model='answers[index]'
                    placeholder='Enter answer text (Markdown)'
                    style='width:100%;resize:none;'
                ></textarea>
            </div>
            <button
                v-on:click='add_answer'
                style='font-size:11.5px'
            >Add answer</button>
        </div>
        <div>
            <div>
                <div>Deck</div>
                <select v-model="deck">
                    <option disabled value="">Select a deck</option>
                    <option
                        v-for='deckopt in decks'
                        v-bind:key='deckopt.id'
                    >{{ deckopt.name }}</option>
                </select>
                <textarea
                    v-model='deck'
                    placeholder='Enter deck to which card should be assigned'
                    style='width:94%;'
                ></textarea>
            </div>
            <button
                v-on:click='submit_card'
                style='font-size:11.5px'
            >Create card</button>
        </div>
    </div>-->
    <div class='row long-thin'>
        <div>Question</div>
        <div>Deck</div>
    </div>
    <div class='row long-thin'>
        <textarea
            v-model='question'
            placeholder='Enter question text (Markdown)'
            style='resize:none;'
        ></textarea>
        <select v-model="deck">
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
                style='width:98%;resize:none;margin-bottom:1em;'
            ></textarea>
            <button
                v-on:click='add_answer'
                style='font-size:11.5px;width:100%;'
            >Add answer</button>
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
    },
    data() {
        return {
            question: '',
            answers: [],
            deck: '',
        }
    },
    methods: {
        submit_card() {
            return this.http_post(api_url+'/create_card', {
                deck: this.deck,
                question: this.question,
                answers: this.answers,
            }, () => {
                this.$emit('create-card-post');
                this.question = '';
                this.answers  = [];
                this.deck     = '';
            });
        },
        add_answer() {
            console.log(this.answers);
            this.answers.push('');
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

