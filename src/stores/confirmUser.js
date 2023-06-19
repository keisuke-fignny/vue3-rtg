import { defineStore } from 'pinia'
import axios from 'axios'

export const useConfirmUser = defineStore({
    id: 'userConfirm',
    state: () => {
        return {
            name: 0,
            mail: 'example@com'
        }
    },
    getters: {

    },
    actions: {
        setUserConfirm(name, mail) {
            this.name = name
            this.mail = mail
        },

        async createUser() {
            const response = await axios.post('http://localhost:8080/api/user/create', {
                name: this.name,
                mail: this.mail
            })
            console.log(response.data)
        }
    }
})