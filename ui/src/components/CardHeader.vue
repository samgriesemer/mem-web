<template>
    <span class='grey'>
        <i>Question 
            <span class='tight-box'>id: {{ card.id }}</span>
            <span class='tight-box'>deck: {{ card.deck.name }}</span>
            <span class='tight-box'>correct: {{ percent_correct }}%</span>
        </i>
        <span style='float:right;'>
            <button id='edit-button'
                v-on:click="$emit('edit-card', card.id)"
            >Edit</button>
        </span>
    </span>
    <hr class='solid'>
</template>

<script>
export default {
    props: {
        card: {
            required: true,
            type: Object
        },
    },
    computed: {
        percent_correct() {
            return (100*this.card.correct_answer_count 
                   / Math.max(this.card.total_answer_count, 1)).toFixed(2);
        }
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
