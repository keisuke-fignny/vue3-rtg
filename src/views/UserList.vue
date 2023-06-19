<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseHeader from '../components/BaseHeader.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()

userStore.getUserList()
const isLoading = computed(
    () => {
        return userStore.isLoading
    }
)

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
                <button type="button" v-on:click=" $router.push({name: 'user_create'})" id="createButton"><img src="@/assets/create.svg" /></button>
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
                                <td>{{ unit.picture }}</td>
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
</style>