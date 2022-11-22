<template>
    <details class='nopad clear' open>
        <summary>
            Cards
            <span style='float:right' class='tight-box'>{{ deck.card_count }} cards</span>
        </summary>
        <div class='card-preview'
            v-for='card in cards'
            v-bind:key='card.id'
        >
            <div>
                <span class='grey'>
                    <i>
                        <span class='tight-box'>id: {{ card.id }}</span>
                        <span class='tight-box'>deck: {{ card.deck.name }}</span>
                        <span class='tight-box'>correct: {{ card.percent_correct }}%</span>
                        <span class='tight-box' style='color:red'>{{ card.remaining_str }}</span>
                    </i>
                    <span style='float:right;position:relative;top:-3px;'>
                        <button class='slim'
                            v-on:click="$emit('edit-card', card.id)"
                        >View full</button>
                        <button class='slim'
                            v-on:click="$emit('edit-card', card.id)"
                        >Edit</button>
                    </span>
                </span>
                <hr class='solid'>
                <div style='font-size:1.1em;font-weight:bold;'>{{ card.question }}</div>
            </div>
        </div>
    </details>
</template>

<script>
import config from '../../config.js'
import * as util from '../mixin.js'

let api_url = config.api_url;

const mixin = {
    methods: util
}

export default {
    name: 'DeckViewer',
    mixins: [mixin],
    props: {
        deck_index: {
            required: true,
            type: Object
        },
        deck_id: {
            required: true,
            type: Number
        },
    },
    data() {
        return {
            cards: []
        }
    },
    methods: {
        get_cards() {
            this.http_get(api_url+'/list_deck/'+this.deck.name, (data) => {
                this.cards = data;
                console.log(data);
            });
        }
    },
    computed: {
        deck() {
            return this.deck_index[this.deck_id];
        },
    },
    watch: {
        deck() {
            console.log('deck viewer before update');
            this.get_cards();
        },
    },
    mounted() {
        this.get_cards();
    },
}
</script>

<style scoped>
button {
    border: 1px solid;
    font-size: 9px;
    top: -2px;
}
.card-preview {
    margin-top: 0.5em;
    padding: 0.5em;
    border: 1px solid;
    border-radius: 4px;
    background: #646adc24;
}
.card-listing-container {
    max-height: 40vh;
    overflow-x: hidden;
    scrollbar-width: none;
}
</style>

