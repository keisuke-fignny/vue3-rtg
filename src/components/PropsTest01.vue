<script setup>
// eslint-disable-next-line no-unused-vars
const p = defineProps({
    name: String,
    id: Number,
})
</script>

<template>
    <div>{{ id }}</div>
    <div>{{ name }}</div>
</template>

<style scoped>
</style>