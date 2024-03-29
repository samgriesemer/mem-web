<template>
    <div class='row-2'>
    <div class='col'>
    <div class='post-col' id='review'>
        <h1>
            Review
            <sup v-if='!review_error_msg' class='notif'>{{ review_total }}</sup>
            <span v-if='review_error_msg' class='refresh-timer'>(in {{ review_freq_time }}s)</span>
        </h1>
        <hr class='solid'>
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
    </div>
    <div class='post-col' id='study'>
        <h1>
            Study
            <sup v-if='!study_error_msg' class='notif'>{{ study_total }}</sup>
            <span v-if='study_error_msg' class='refresh-timer'>(in {{ study_freq_time }}s)</span>
        </h1>
        <hr class='solid'>
        <div class='study-container'>
            <div v-if='!study_error_msg'>
                <study
                    v-bind:study_card='study_card'
                    @study-post='handle_study_post'
                    @study-next='handle_study_next'
                />
            </div>
            <div v-if='study_error_msg'>
                <span style='color:red'><i>{{ study_error_msg }}</i></span>
            </div>
        </div>
    </div>
    <div v-if='update_visible' class='post-col' id='update-card'>
        <h1>Editing card <i>#{{ update_card.id }}</i></h1><hr class='solid'>
        <div class='update-card-container'>
            <update-card
                v-bind:update_card='update_card'
                v-bind:decks='decks'
                @update-card-post='handle_update_card_post'
            />
        </div>
    </div>
    <div class='post-col' id='create-card'>
        <h1>Create card</h1><hr class='solid'>
        <div class='create-card-container'>
            <create-card
                v-bind:decks="decks"
                @create-card-post='handle_create_card_post'
            />
        </div>
    </div>
    </div>
    <div class='col'>
    <div class='post-col' id='decks'>
        <h1>Decks</h1><hr class='solid'>
        <div class='row-2'>
            <deck
                v-for="deck in decks"
                v-bind:deck="deck"
                v-bind:key="deck.id"
                @view-deck='handle_view_deck'
            />
        </div>
    </div>
    <div v-if='deck_viewer_visible' class='post-col' id='decks'>
        <h1>Viewing deck</h1><hr class='solid'>
        <div class='deck-viewer-container'>
            <deck-viewer
                v-bind:deck_index="deck_index"
                v-bind:deck_id="view_deck_id"
                @edit-card='refresh_update_card'
            />
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import config from '../config.js'
import * as util from './mixin.js'

import Review from './components/Review.vue'
import Study from './components/Study.vue'
import Deck from './components/Deck.vue'
import DeckViewer from './components/DeckViewer.vue'
import CreateCard from './components/CreateCard.vue'
import UpdateCard from './components/UpdateCard.vue'

let api_url = config.api_url;

const mixin = {
    methods: util
}

export default {
    name: 'App',
    mixins: [mixin],
    components: {
        Review,
        Study,
        Deck,
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
        }
    },
    methods: {
        get_decks() {
            console.log(this._props);
            console.log(document.location);
            console.log(this.rootProps);
            console.log(this.testprop);
            return this.http_get(api_url+'/list_decks', (data) => {
                this.decks = data;
                data.forEach((v) => {
                    this.deck_index[v.id] = v;
                });
            });
        },
        get_review_card() {
            return this.http_get(api_url+'/review', (data) => {
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
        get_study_card() {
            return this.http_get(api_url+'/study', (data) => {
                // might be able to full replace this and just allow card to be null,
                // return empty msg from API. no conditional required here
                if (data.card != null) {
                    this.study_card = data.card;
                    this.study_error_msg = '';
                    this.study_total = data.stats.total;
                } else {
                    this.study_card = {};
                    this.study_error_msg = data.msg;

                    this.study_freq_timer = this.countdown(
                        this.poll_freq,
                        this.study_freq_timer,
                        (t) => {
                            this.study_freq_time = t;
                        },
                        (t) => {
                            if (t <= 0 || !this.study_error_msg) {
                                this.get_study_card();
                                return true;
                            }
                            return false;
                        }
                    );
                }
            });
        },
        handle_review_post() {
            this.get_decks();
            this.get_review_card();
            /*if (this.study_error_msg) {
                this.get_study_card();
            }*/
        },

        handle_study_post() {
            this.get_decks();
            this.get_review_card();
        },
        handle_study_next() {
            this.get_study_card();
        },

        handle_create_card_post() {
            this.get_decks();
            this.get_study_card();
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
        handle_view_deck(deck_id) {
            this.view_deck_id = deck_id;
            this.deck_viewer_visible = true;
        },
    },
    mounted() {
        this.get_decks();
        this.get_review_card();
        this.get_study_card();
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
    box-shadow: 8px 8px 8px -4px rgba(0,0,0,0.12);
}

/*#review > div,
#study > div,
#create-card > div,
#update-card > div {
    margin-top: 1em;
}*/

.update-card-container {
    background: #646adc24;
}

.create-card-container {
    background: #81b70536;
}


#decks > div {
    margin-top: 1em;
    grid-gap: 1em;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

#decks > div > div {
    padding: 0.8em;
    border: 1px solid #444;
    border-radius: 4px;
    box-shadow: 8px 8px 8px -4px rgba(0,0,0,0.12);
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
</style>

