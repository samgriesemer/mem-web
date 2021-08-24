<template>
    <card-question v-bind:card='study_card' />

    <div v-if='toggle_input' class='row study-input'>
        <textarea
            v-model='submitted_answer'
            placeholder='Optional answer'
            @keyup.enter.exact='submit_response'
        ></textarea>
        <button
            v-on:click='submit_response'
            style='font-size:11.5px'
        >View answer</button>
    </div>
    
    <div v-if='toggle_answer' class='col study-answer'>
        <div class='row-2'>
            <div>
                <card-answer v-bind:card='study_card' />
            </div>

            <div v-if='submitted_answer' class='study-answer-query'>
                <span class='grey'><i>Submitted answer</i></span><hr class='solid'>
                <h2 style='margin:0'>{{ submitted_answer }}</h2>
            </div>
        </div>
        <button
            v-on:click='study_next'
            style='font-size:11.5px'
        >Next card</button>
    </div>
</template>

<script>
import config from '../../config.js'
import * as util from '../mixin.js'

//let api_url = 'http://192.168.1.69:8001';
let api_url = config.api_url;

const mixin = {
    methods: util
}

export default {
    name: 'Study',
    mixins: [mixin],
    props: {
        study_card: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            submitted_answer: '',
            toggle_input: true,
            toggle_answer: false,
        }
    },
    methods: {
        submit_response() {
            this.toggle_input  = false;
            this.toggle_answer = true;

            return this.http_post(api_url+'/post_study', {
                card_id: this.study_card.id,
            }, () => {
                this.$emit('study-post');
            });
        },

        study_next() {
            this.$emit('study-next');
            this.toggle_input     = true;
            this.toggle_answer    = false;
            this.submitted_answer = '';
        },
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
</style>

