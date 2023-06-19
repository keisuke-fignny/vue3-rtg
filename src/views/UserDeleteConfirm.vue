<script setup>
import { computed } from 'vue'
import { useUserDetail } from '../stores/userDetail'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route  = useRoute()
const userDetail = useUserDetail()
userDetail.getUserDetail(route.params.id)
const isLoading = computed(
    () => {
        return userDetail.isLoading
    }
)

async function deleteUser(){
    await axios.post('http://localhost:8080/api/user/delete/',{
        id: userDetail.user.id,
    })
    window.location = "http://localhost:5173/user/"
}

</script>

<template>
    <p v-if="isLoading">研修生データの取得中.....</p>
    <section v-else>
        <div class="base-div">
            <div class="left-div">
                <div class="cell-div"><label for="name-input">ID</label></div>
                <div class="cell-div"><label for="name-input">名前</label></div>
                <div class="cell-div"><label for="mail-input">メールアドレス</label></div>
            </div>
            <div class="center-div">
                <div class="cell-div"><label>{{ userDetail.user.id }}</label></div>
                <div class="cell-div"><label>{{ userDetail.user.name }}</label></div>
                <div class="cell-div"><label>{{ userDetail.user.mail }}</label></div>
            </div>
            <div class="right-div">
            </div>
        </div>
    </section>

    <div class="message-div">
        こちらのデータを削除します。本当によろしいですか？
    </div>
    <div class="action-ui-div">
        <input class="btn btn-danger btn-lg" value="削除" v-on:click="deleteUser()" style="margin-left:30px; margin-right:30px; width:130px;"/>
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
.message-div {
    margin-left: 300px;
    margin-bottom: 30px;
}
.action-ui-div {
    margin-left: 300px;
}
</style>