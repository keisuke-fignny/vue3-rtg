<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirmUser } from '../stores/confirmUser'
const okButtonClassName = ref('btn btn-dark btn-lg')
const noButtonClassName = ref('btn btn-dark btn-lg')

const router = useRouter()
const confirmStore = useConfirmUser()

const name = ref('名前')
const mail = ref('example@com')
const mailRegex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
const isMailValid = ref(false)
const isButtonEnabled = computed(
    () => {
        return !isMailValid.value
    }
)

function toConfirm(_name, _mail){
    confirmStore.setUserConfirm(_name, _mail)
    confirmStore.$patch({
        name: _name,
        mail: _mail
    })
    router.push('/user/create/confirm')
}

watch(mail, () => {
    if(mailRegex.test(mail.value)){
        isMailValid.value = true
    } else {
        isMailValid.value = false
    }
})

</script>

<template>
    <div class="base-div">
        <div class="left-div">
            <div class="cell-label-div"><label for="name-input">名前</label></div>
            <div class="cell-label-div"><label for="name-mail">メールアドレス</label></div>
        </div>
        <div class="center-div">
            <div class="cell-div"><input type="text"  v-model="name" id="name-input" name="name-input" size="20" /></div>
            <div v-if="isMailValid" class="errorDiv">
                <label></label>
            </div>
            <div v-else class="errorDiv">
                <label>※メールアドレスの書式が正しくありません</label>
            </div>
            <div class="cell-div"><input type="text"  v-model="mail" id="name-mail" name="name-mail" size="30" /></div>
        </div>
        <div class="right-div">
        </div>
    </div>

    <div class="action-ui-div">
        <input v-bind:class="okButtonClassName" v-bind:disabled="isButtonEnabled" value="確認" v-on:click="toConfirm(name, mail)" style="margin-left:30px; margin-right:30px; width:130px;"/>
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
    margin-bottom: 50px;
}
.cell-label-div {
    margin-bottom: 80px;
}

.action-ui-div {
    margin-left: 300px;
}

div.errorDiv {
    margin: 0 0 0 0;
    color: red;
}
</style>