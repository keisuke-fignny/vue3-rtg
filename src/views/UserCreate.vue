<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirmUser } from '../stores/confirmUser'
const okButtonClassName = ref('btn btn-dark btn-lg')
const noButtonClassName = ref('btn btn-dark btn-lg')

const router = useRouter()
const confirmStore = useConfirmUser()

const name = ref('名前')
const mail = ref('example@com')

function toConfirm(_name, _mail){
    console.log(_name, _mail)
    confirmStore.setUserConfirm(_name, _mail)
    confirmStore.$patch({
        name: _name,
        mail: _mail
    })
    router.push('/user/create/confirm')
}

</script>

<template>
    <div class="base-div">
        <div class="left-div">
            <div class="cell-div"><label for="name-input">名前</label></div>
            <div class="cell-div"><label for="name-mail">メールアドレス</label></div>
        </div>
        <div class="center-div">
            <div class="cell-div"><input type="text"  v-model="name" id="name-input" name="name-input" size="20" /></div>
            <div class="cell-div"><input type="text"  v-model="mail" id="name-mail" name="name-mail" size="30" /></div>
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