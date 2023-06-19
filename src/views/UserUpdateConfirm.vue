<script setup>
import { useUpdateConfirmUser } from '../stores/updateConfirmUser'

const useUpdateConfirmStore = useUpdateConfirmUser()

// ユーザー新規登録
function updateUser(){
    useUpdateConfirmStore.updateUser()
    window.location = 'http://localhost:5173/user/'
}

</script>

<template>
    <div class="base-div">
        <div class="left-div">
            <div class="cell-div"><label for="name-input">ID</label></div>
            <div class="cell-div"><label for="name-input">名前</label></div>
            <div class="cell-div"><label for="mail-input">メールアドレス</label></div>
        </div>
        <div class="center-div">
            <div class="cell-div"><label>{{ useUpdateConfirmStore.id }}</label></div>
            <div class="cell-div"><label>{{ useUpdateConfirmStore.name }}</label></div>
            <div class="cell-div"><label>{{ useUpdateConfirmStore.mail }}</label></div>
        </div>
        <div class="right-div">
        </div>
    </div>

    <div class="action-ui-div">
        <input class="btn btn-primary btn-lg" value="更新" v-on:click="updateUser()" style="margin-left:30px; margin-right:30px; width:130px;"/>
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
    margin-left:300px
}
</style>