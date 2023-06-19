import { defineStore } from 'pinia'
import axios from 'axios'

export const useUpdateConfirmUser = defineStore({
    id: 'userUpdateConfirm',
    state: () => {
        return {
            id: 0,
            name: 'default',
            mail: 'example@com'
        }
    },
    getters: {

    },
    actions: {
        async initUser(id) {
            const response = await axios.get('http://localhost:8080/api/user/' + id)
            const data = response.data
            this.id = data.id
            this.name = data.name
            this.mail = data.mail
        },

        async updateUser() {
            const response = await axios.post('http://localhost:8080/api/user/update', {
                id: this.id,
                name: this.name,
                mail: this.mail
            })
            console.log(response.data)
        }
    }
})