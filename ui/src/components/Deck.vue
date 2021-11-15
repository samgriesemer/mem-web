<template>
    <div>
        <div>
            <span class='tight-box'>{{ deck.card_count }} cards</span>
            <button
                style='float:right'
                v-on:click="$emit('view-deck', deck.id)"
            >+</button>
        </div>
        <h2>{{ deck.name }}</h2>
        <div v-if='deck.desc' class='grey desc'><i>{{ deck.desc }}</i></div>
    </div>
</template>

<script>
export default {
    props: {
        deck: {
            required: true,
            type: Object
        }
    },
}
</script>

<style scoped>
h2 {
    margin: 0;
    margin-top: 0.2em;
}
.desc {
    margin-top: 0.3em;
}
button {
    border: 1px solid;
    font-size: 9px;
    top: -2px;
}
</style>

