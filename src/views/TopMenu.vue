<script setup>

</script>

<template>
    <h2>研修生コミュニティ</h2>
    <!--<router-link to="/user">一覧</router-link>-->
    <div>
        <button type="button" class="btn btn-primary"  v-on:click="() => $router.push({name: 'user_list'})">一覧</button>
    </div>
</template>

<style scoped>
h1,h2,h3 {
    text-align: center;
    color:#3a3a3a;
}
div {
    text-align: center;
}
button {
    margin-top: 100px;
}
</style>