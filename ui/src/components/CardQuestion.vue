<template>
    <card-header
        v-bind:card='card'
        @edit-card="id => $emit('edit-card',id)"
    />

    <!--<h1 style='margin-top:0.3em'>{{ card.question }}</h1>-->
    <div v-if='!cloze_active' v-html='card.html.question' class='q-text'></div>
    <div v-if='cloze_active' v-html='card.html.answers' class='q-text'></div>
</template>

<script>
import CardHeader from './CardHeader.vue'

export default {
    components: {
        CardHeader,
    },
    props: {
        card: {
            required: true,
            type: Object
        },
        cloze_active: {
            required: false,
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style scoped>
.q-text {
    font-size: 2em;
    font-weight: bold;
    margin-top: 0.4em;
}

#edit-button {
    padding: revert;
    position: relative;
    top: -1px;
}
</style>
