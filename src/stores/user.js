import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore({
    id: 'users',
    state: () => {
        return {
            isLoading: true,
            users: [
                {
                    'id': 0,
                    'name': '',
                    'mail': '',
                    'picture': '',
                },
            ]
        }
    },
    getters: {

    },
    actions: {
        async getUserList(){
            const response = await axios.get('http://localhost:8080/api/user')
            this.users = response.data;
            this.isLoading = false
        }
    }
})