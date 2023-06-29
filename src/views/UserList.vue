<script setup>
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseHeader from '../components/BaseHeader.vue'
import { useUserStore } from '../stores/user'
//import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage"

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

//const storage = getStorage()
//const defaultPic = storageRef(storage, "default.png")

const requestedPage = computed(
    () => {
        if(route.params.requestedPage < 1 || route.params.requestedPage === undefined ){
            return 1;
        } else {
            return Number(route.params.requestedPage)
        }
    }
)

// 1ページより前の数字にならない制御
const prevPage = computed(
    () => {
        if(requestedPage.value < 1){
            return 1;
        } else {
            return requestedPage.value - 1
        }
    }
)

// ページ総数より大きな数字にならない制御
const nextPage = computed(
    () => {
        if(requestedPage.value >= userStore.pageAllCount) {
            return userStore.pageAllCount
        } else {
            return requestedPage.value + 1
        }
    }
)

// 前ページがあるか
const canMovePrev = computed(
    () => {
        if(userStore.pageNo > 1) {
            return true;
        } else {
            return false;
        }
    }
)

// 次のページがあるか
const canMoveNext = computed(
    () => {
        if(userStore.pageNo < userStore.pageAllCount){
            return true;
        } else {
            return false;
        }
    }
)

userStore.getUserList(requestedPage.value)
const isLoading = computed(
    () => {
        return userStore.isLoading
    }
)

watch(route, () => {
    userStore.getUserList(requestedPage.value)
})

/*
getDownloadURL(defaultPic)
    .then((url) => {
        console.log(url)
        userStore.users[0].picture = url
    })
    .catch((error) => {
        console.log(error)
    })
    */


function goToPage(toPage){
    router.push({name: 'user_list_with_page', params: {requestedPage: toPage}})
}

// ユーザ編集画面へ
function toUpdate(id) {
    router.push({name: 'user_update', params: {id: id}})
}

// ユーザ削除画面へ
function toDeleteConfirm(id) {
    router.push({name: 'user_delete_confirm', params: {id: id}})
}
</script>

<template>
    <BaseHeader headerTitle="研修生一覧" />
    <div id="topDiv">
        <div id="leftDiv"></div>
        <div id="centerDiv">
            <div id="buttonDiv">
                <button type="button" v-on:click="$router.push({name: 'user_create'})" id="createButton"><img src="@/assets/create.svg" /></button>
            </div>
            <p v-if="isLoading">研修生データの取得中.....</p>
            <section v-else>
                <div id="contentDiv">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>名前</th>
                                <th>メールアドレス</th>
                                <th>プロフィール画像</th>
                                <th>編集</th>
                                <th>名前</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="unit in userStore.users"
                                v-bind:key="unit.id">
                                <td>{{ unit.id }}</td>
                                <td>{{ unit.name }}</td>
                                <td>{{ unit.mail }}</td>
                                <td style="text-align:center;"><img v-bind:src="unit.picture" width="32" height="32" /></td>
                                <td><img v-on:click="toUpdate(unit.id)" src="@/assets/edit.svg" class="menuIconImg"/></td>
                                <td><img v-on:click="toDeleteConfirm(unit.id)" src="@/assets/trash.svg" class="menuIconImg"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            </div>
        <div id="rightDiv"></div>
    </div>
    <div class="pagenationDiv">

        <div v-if="canMovePrev" class="pagenationLeftDiv"><button type="button" v-on:click="goToPage(prevPage)" class="btn btn-dark btn-small">前</button></div>
        <div v-else class="pagenationLeftDiv"><button type="button" class="btn btn-secondary btn-small" disabled>前</button></div>
        <div class="pagenationCenterDiv">
            <div v-for="i in (userStore.pageAllCount)" v-bind:key="i">
                <button type="button" v-on:click="goToPage(i)" class="btn btn-outline-secondary ms-1 me-1">{{ i }}</button>
            </div>
        </div>
        <div v-if="canMoveNext" class="pagenationRightDiv"><button type="button" v-on:click="goToPage(nextPage)" class="btn btn-dark btn-small">次</button></div>
        <div v-else class="pagenationRightDiv"><button type="button" v-on:click="toNext()" class="btn btn-secondary btn-small" disabled>次</button></div>
    </div>
</template>

<style scoped>
#topDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
/*
#leftDiv {
    width: 20%;
}
#rightDiv {
    width: 20%;
}
#centerDiv {
    width: 60%;
}*/
#buttonDiv {
    text-align: right;
}
#createButton {
    padding: 10px;
    border: none;
    background: transparent;
}
button#createButton img {
    display: block;
    width: 2rem;
    height: 2rem;
}
.menuIconImg {
    width: 1.3rem;
    height: 1.3rem;
}
table {
    width: 100%;
}

div.pagenationDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
div.pagenationLeftDiv {
    width: 25%;
    text-align: right;
}
div.pagenationCenterDiv {
    width: 50%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
div.pagenationRightDiv {
    width: 25%;
    text-align: left;
}
</style>