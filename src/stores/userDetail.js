import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserDetail = defineStore({
    id: 'userDetail',
    state: () => {
        return {
            isLoading: true,
            user: {
                id: 0,
                name: '',
                mail: '',
                picture: '',
                storageFileName: '',
            },
        }
    },
    getters: {

    },
    actions: {
        async getUserDetail(userId){
            const response = await axios.get('http://localhost:8080/api/user/' + userId)
            this.user = response.data
            console.log(this.user)
            this.isLoading = false
        }
    }
})