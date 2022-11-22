<template>
    <details id='create-card' class='nopad clear' open>
        <summary>Create card</summary>
        <div class='create-card-container'>
            <create-card
                v-bind:decks="decks"
                v-bind:lock_deck="primary_deck_obj"
                @create-card-post='handle_create_card_post'
            />
        </div>
    </details>

    <details class='nopad clear' id='review' open>
        <summary>
            Review
            <sup v-if='!review_error_msg' class='notif'>{{ review_total }}</sup>
            <span v-if='review_error_msg' class='refresh-timer'>(in {{ review_freq_time }}s)</span>
        </summary>
        <div class='review-container'>
            <div v-if='!review_error_msg'>
                <review
                    v-bind:review_card='review_card'
                    @review-post='handle_review_post'
                    @edit-card='refresh_update_card'
                />
            </div>
            <div v-if='review_error_msg'>
                <span style='color:red'><i>{{ review_error_msg }}</i></span>
            </div>
        </div>
    </details>
    <div v-if='update_visible' id='update-card'>
        <h2 class='sol'>Editing card <span style='color:red'>#{{ update_card.id }}</span></h2>
        <div class='update-card-container'>
            <update-card
                v-bind:update_card='update_card'
                v-bind:decks='decks'
                @update-card-post='handle_update_card_post'
            />
        </div>
    </div>
    <div v-if='primary_deck_obj.id' class='deck-viewer-container' id='decks'>
        <deck-viewer
            v-bind:deck_index="deck_index"
            v-bind:deck_id="primary_deck_obj.id"
            @edit-card='refresh_update_card'
        />
    </div>
</template>

<script>
import config from '../config.js'
import * as util from './mixin.js'

import Review from './components/Review.vue'
import DeckViewer from './components/DeckViewerLite.vue'
import CreateCard from './components/CreateCardLite.vue'
import UpdateCard from './components/UpdateCard.vue'

let api_url = config.api_url;

const mixin = {
    methods: util
}

export default {
    name: 'ArticleEmbed',
    mixins: [mixin],
    props: ['primary_deck', 'deck_list'],
    components: {
        Review,
        DeckViewer,
        CreateCard,
        UpdateCard,
    },
    data() {
        return {
            decks: [],
            deck_index: {},
            poll_freq: 30,
            
            // attempt to resolve require deep init
            review_card: {deck: {}, html: {}},
            review_error_msg: '',
            review_total: 0,
            review_timer: null,
            review_freq_timer: null,
            review_freq_time: 0,

            study_card: {deck: {}, html: {}},
            study_error_msg: '',
            study_total: 0,
            study_freq_timer: null,
            study_freq_time: 0,
            
            update_visible: false,
            update_card: {},

            deck_viewer_visible: false,
            view_deck_id: null,

            primary_deck_obj: {},
        }
    },
    methods: {
        get_decks() {
            return this.http_get(api_url+'/list_decks', (data) => {
                this.decks = data;
                this.primary_deck_obj = {
                    name: this.primary_deck,
                    id: null
                };

                data.forEach((v) => {
                    this.deck_index[v.id] = v;
                    if (v.name == this.primary_deck) {
                        this.primary_deck_obj = v;
                    }
                });
            });
        },
        get_review_card() {
            return this.http_get(api_url+'/review/'+this.primary_deck, (data) => {
                console.log(data);

                if (data.card != null) {
                    this.review_card = data.card;
                    this.review_error_msg = '';
                    this.review_total = data.stats.total;
                    console.log('non-null card');
                } else {
                    this.review_card = {};
                    this.review_error_msg = data.msg;
                    
                    if (data.time_remaining) {
                        let time_remaining = parseInt(data.time_remaining);

                        this.review_timer = this.countdown(
                            time_remaining,
                            this.review_timer,
                            (t) => {
                                let tstr = this.time_str(t*1000);
                                this.review_error_msg = 'No cards to review. Next review in ' + tstr + '.';
                            },
                            (t) => t <= 0 || !this.review_error_msg,
                        );

                        this.review_freq_timer = this.countdown(
                            this.poll_freq,
                            this.review_freq_timer,
                            (t) => {
                                this.review_freq_time = t;
                            },
                            (t) => {
                                if (!this.review_error_msg) {
                                    return true;
                                } else if (t <= 0) {
                                    this.get_review_card();
                                    return true;
                                }
                                return false;
                            },
                            1000
                        );

                        // begin intermittent polling until error_msg is unset
                        //setTimeout(() => {
                            //if (!this.review_error_msg) return;
                            //this.get_review_card()
                        //}, this.poll_freq*1000)
                    }
                }
            });
        },
        handle_review_post() {
            this.get_decks();
            this.get_review_card();
        },
        handle_create_card_post() {
            this.get_decks();
        },
        refresh_update_card(id) {
            console.log('update received id '+id);
            //this.handle_update_card_post();
            this.http_get(api_url+'/get_card/'+id, (data) => {
                this.update_card = data;
                console.log(data);
                this.update_visible = true;
            });
        }, 
        handle_update_card_post() {
            this.update_card = {};
            this.update_visible = false;
            this.get_decks();
        },
    },
    mounted() {
        this.get_decks();
        this.get_review_card();
    }
}
</script>

<style>
.review-container,
.study-container,
.create-card-container,
.update-card-container {
    padding: 1em;
    border: 1px solid #444;
    border-radius: 4px;
}

.update-card-container {
    background: #646adc24;
}

.create-card-container {
    background: #81b70536;
}

#decks > div {
    grid-gap: 1em;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.notif {
    color: white;
    font-size: 0.5em;
    padding: 0 0.36em;
    border-radius: 50%;
    background: red;
    position: relative;
    top: -5px;
    left: -2px;
}

.refresh-timer {
    font-size: 0.5em;
    float: right;
    font-style: italic;
}

.long-thin {
    grid-template-columns: 3fr 1fr;
}
</style>

