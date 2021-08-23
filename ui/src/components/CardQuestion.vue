<template>
    <span class='grey'><i>Question 
        <span class='tight-box'>id: {{ card.id }}</span>
        <span class='tight-box'>deck: {{ card.deck.name }}</span>
        <span class='tight-box'>correct: {{ percent_correct }}%</span>
    </i></span>
    <hr class='solid'>

    <!--<h1 style='margin-top:0.3em'>{{ card.question }}</h1>-->
    <div v-html='card.html.question' class='q-text'></div>
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
            return 100*(this.card.correct_answer_count 
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
</style>
