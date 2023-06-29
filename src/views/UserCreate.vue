<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirmUser } from '../stores/confirmUser'
import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable } from "firebase/storage";
const okButtonClassName = ref('btn btn-dark btn-lg')
const noButtonClassName = ref('btn btn-dark btn-lg')

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const router = useRouter()
const confirmStore = useConfirmUser()

const name = ref('名前')
const mail = ref('example@com')
const uploadFileName = ref('https://xxx.png')
const fileData = ref("")
const mailRegex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
const isMailValid = ref(false)
const isButtonEnabled = computed(
    () => {
        return !isMailValid.value
    }
)

function toConfirm(_name, _mail){

    //confirmStore.setUserConfirm(_name, _mail)
    /*
    confirmStore.$patch({
        name: _name,
        mail: _mail,
        picture: uploadFileUrl,
    })*/
    console.log(uploadFileName.value)
    uploadImgToStorage(uploadFileName.value, fileData.value, _name, _mail)
}

watch(mail, () => {
    if(mailRegex.test(mail.value)){
        isMailValid.value = true
    } else {
        isMailValid.value = false
    }
})

async function uploadImgToStorage(title, d, _name, _mail){
    const meta = {
        contentType: d.type,
    }

    const storage = getStorage()
    const imageRef = storageRef(storage,'/' + title)
    await uploadBytesResumable(imageRef, d, meta)
        .then((uploadedFile) => {
            getDownloadURL(uploadedFile.ref)
        .then((url) => {
            console.log("success")
            confirmStore.setUserConfirm(_name, _mail, url, title)
            router.push('/user/create/confirm')
        })
    })
}

function setFileUrl(e) {
    // タイムスタンプ(ミリ秒)でファイル名作成
    let rand_str = '';
    for ( var i = 0; i < 4; i++ ) {
	    rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const originalName = e.target.files[0].name
    const matches = originalName.match(/^.*(\.[a-zA-Z]{3,4})$/)   // 拡張子部分だけを取得
    uploadFileName.value =  '_' + rand_str + Date.now() + matches[1]
    fileData.value = e.target.files[0]
    //await uploadImgToStorage(fileName, e.target.files[0])
}


</script>

<template>
    <div class="base-div">
        <div class="left-div">
            <div class="cell-label-div"><label for="name-input">名前</label></div>
            <div class="cell-label-div"><label for="mail-input">メールアドレス</label></div>
            <div class="cell-label-div"><label for="pict-input">プロフィール画像</label></div>
        </div>
        <div class="center-div">
            <div class="cell-div"><input type="text"  v-model="name" id="name-input" name="name-input" size="20" /></div>
            <div v-if="isMailValid" class="errorDiv">
                <label></label>
            </div>
            <div v-else class="errorDiv">
                <label>※メールアドレスの書式が正しくありません</label>
            </div>
            <div class="cell-div"><input type="text"  v-model="mail" id="mail-input" name="mail-input" size="30" /></div>
            <div class="cell-image-div"><input type="file"  id="pict-input" name="pict-input" accept="image/jpeg,image/png,image/gif" v-on:change="setFileUrl" /></div>
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
.cell-image-div {
    margin-top: 70px;
}

.action-ui-div {
    margin-left: 300px;
}

div.errorDiv {
    margin: 0 0 0 0;
    color: red;
}
</style>