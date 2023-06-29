<script setup>
import { useConfirmUser } from '../stores/confirmUser'

const confirmStore = useConfirmUser()

// ユーザー新規登録
async function registerNewUser(){
    confirmStore.createUser()
    window.location = 'http://localhost:5173/user/'  //生のjs
}

</script>

<template>
    <div class="base-div">
        <div class="left-div">
            <div class="cell-div"><label for="name-input">名前</label></div>
            <div class="cell-div"><label for="mail-input">メールアドレス</label></div>
            <div class="cell-div"><label for="pict-input">プロフィール画像</label></div>
        </div>
        <div class="center-div">
            <div class="cell-div"><label>{{ confirmStore.name }}</label></div>
            <div class="cell-div"><label>{{ confirmStore.mail }}</label></div>
            <div class="cell-div"><img v-bind:src="confirmStore.picture" width="32" height="32"/></div>
        </div>
        <div class="right-div">
        </div>
    </div>

    <div class="action-ui-div">
        <input class="btn btn-primary btn-lg" value="登録" v-on:click="registerNewUser()" style="margin-left:30px; margin-right:30px; width:130px;"/>
        <router-link to="/user" class="btn btn-dark btn-lg" style="margin-left:30px; margin-right:30px; width:130px;">キャンセル</router-link>
    </div>
</template>

<style scoped>
.base-div {
    display: flex;
}
.left-div {
    text-align: right;
    margin-left: 300px;
    margin-right: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
}
.center-div {
    text-align: left;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
}
.input-div {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
}
.cell-div {
    margin-top: 50px;
    margin-bottom: 50px;
}
.action-ui-div {
    margin-left: 300px;
}
</style>