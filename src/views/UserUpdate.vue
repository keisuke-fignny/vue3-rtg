<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUpdateConfirmUser } from '../stores/updateConfirmUser'

const okButtonClassName = ref('btn btn-dark btn-lg')
const noButtonClassName = ref('btn btn-dark btn-lg')

const router = useRouter()
const route = useRoute()
const updateConfirmStore = useUpdateConfirmUser()
updateConfirmStore.initUser(route.params.id)

function toConfirm(){
    router.push('/user/update/confirm')
}

</script>

<template>
    <div class="base-div">
        <div class="left-div">
            <div class="cell-div"><label for="id-input">ID</label></div>
            <div class="cell-div"><label for="name-input">名前</label></div>
            <div class="cell-div"><label for="mail-input">メールアドレス</label></div>
        </div>
        <div class="center-div">
            <div class="cell-div"><label>{{ updateConfirmStore.id }}</label></div>
            <div class="cell-div"><input type="text" v-model="updateConfirmStore.name" id="name-input" name="name-input" size="20" /></div>
            <div class="cell-div"><input type="text" v-model="updateConfirmStore.mail" id="mail-input" name="mail-input" size="30" /></div>
        </div>
        <div class="right-div">
        </div>
    </div>

    <div class="action-ui-div">
        <input v-bind:class="okButtonClassName" value="確認" v-on:click="toConfirm(name, mail)" style="margin-left:30px; margin-right:30px; width:130px;"/>
        <router-link to="/user" v-bind:class="noButtonClassName" style="margin-left:30px; margin-right:30px; width:130px;">キャンセル</router-link>
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