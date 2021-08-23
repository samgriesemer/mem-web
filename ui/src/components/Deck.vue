<template>
    <div>
        <span class='tight-box'>{{ deck.card_count }} cards</span>
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
    }
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
</style>

