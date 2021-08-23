<template>
    <span class='grey'><i>Answer(s)</i></span>
    <hr class='solid'>

    <!--<h2 style='margin:0'>{{ answer }}</h2>-->
    <div v-html='card.html.answers' class='a-text'></div>
</template>

<script>
export default {
    props: {
        card: {
            required: true,
            type: Object
        }
    },
    computed: {
        answer() {
            return this.card.answers.join(', ');
        }
    }
}
</script>

<style scoped>
.a-text {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0.4em;
}
</style>

