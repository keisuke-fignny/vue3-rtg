import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserDetail = defineStore({
    id: 'userDetail',
    state: () => {
        return {
            isLoading: true,
            user: {
                'id': 0,
                'name': '',
                'mail': '',
                'picture': '',
            },
        }
    },
    getters: {

    },
    actions: {
        async getUserDetail(userId){
            const response = await axios.get('http://localhost:8080/api/user/' + userId)
            console.log(response.data)
            this.user = response.data;
            this.isLoading = false
        }
    }
})