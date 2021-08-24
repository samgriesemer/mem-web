<template>
    <card-question v-bind:card='review_card' />

    <div v-if='toggle_input' class='row review-input'>
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

    <div v-if='toggle_answer' class='row-2 review-answer'>
        <div>
            <div>
                <card-answer v-bind:card='review_card' />
            </div>
            <div v-if='submitted_answer' class='review-answer-query'>
                <span class='grey'><i>Submitted answer</i></span><hr class='solid'>
                <h2 style='margin:0'>{{ submitted_answer }}</h2>
            </div>
        </div>

        <div class='review-answer-feedback'>
            <span class='grey'><i>Feedback</i></span><hr class='solid'>

            <button style='background:#2ECC40' v-on:click='post_feedback(5)'>5</button>
            <span class='grey'><i> - perfect response</i></span><br>
            <button style='background:#3D9970' v-on:click='post_feedback(4)'>4</button>
            <span class='grey'><i> - correct response after hesitation</i></span><br>
            <button style='background:#FFDC00' v-on:click='post_feedback(3)'>3</button>
            <span class='grey'><i> - correct response recalled with difficulty</i></span><br>
            <button style='background:#FF851B' v-on:click='post_feedback(2)'>2</button>
            <span class='grey'><i> - incorrect response; correct one easy to recall</i></span><br>
            <button style='background:#FF4136' v-on:click='post_feedback(1)'>1</button>
            <span class='grey'><i> - incorrect response; correct one remembered</i></span><br>
            <button style='background:#111111;color:white' v-on:click='post_feedback(0)'>0</button>
            <span class='grey'><i> - complete blackout</i></span>
        </div>
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
// figure out how to not be redundant with mixin, global vars

// initially thought the outer app should make the api call and pass response object back
// to this component, but it's just more complicated than necessary...it seems like
// we'll almost want the review component to just handle everything the same way. I guess
// only difference here could be if we had card specific review, but this also doesn't
// feel super official since you're not really supposed to be able to post feedback to a
// card out of turn. You can view and study it if you'd like, but feedback isn't eligible
// unless through an official review object (perhaps). For now sticking with this for
// simplicity sake.

export default {
    name: 'Review',
    mixins: [mixin],
    props: {
        review_card: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            submitted_answer: '',
            toggle_input:  true,
            toggle_answer: false,
        }
    },
    methods: {
        submit_response() {
            this.toggle_input  = false;
            this.toggle_answer = true;
        },
        post_feedback(q) {
            return this.http_post(api_url+'/post_feedback', {
                card_id: this.review_card.id,
                q: q,
                text: this.submitted_answer
            }, () => {
                this.$emit('review-post');
                this.toggle_input     = true;
                this.toggle_answer    = false;
                this.submitted_answer = '';
            });
        },
    }
}
</script>

<style scoped>
.review-input {
    margin-top: 1.2em;
    grid-template-columns: 6fr 1fr;
}

.review-answer {
    margin-top: 2em;
}

.review-answer-query {
    margin-top: 1em;
}

.review-answer-feedback > button {
    margin-bottom: 0.5em;
    padding: 4px 12px;
}

.review-answer-feedback > button:hover {
    color: black;
    opacity: 0.5;
}
</style>

