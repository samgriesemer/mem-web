<template>
    <div id='card'>
       <card-question v-bind:card="card" />
       <card-answer   v-bind:card="card" /> 
    </div>
</template>

<script>
import CardQuestion from './CardQuestion.vue'
import CardAnswer from './CardAnswer.vue'

export default {
    components: {
        CardQuestion,
        CardAnswer
    },
    props: {
        card: {
            required: true,
            type: Object
        },
    }
}
</script>

<style scoped>
</style>

