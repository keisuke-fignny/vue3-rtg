<script setup>
import { defineProps } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps(['headerTitle'])
</script>

<template>
    <h2>{{ headerTitle }}</h2>
    <hr/>
</template>

<style scoped>
h1,h2,h3 {
    text-align: center;
    color:#3a3a3a;
}
</style>

