import { defineStore } from 'pinia'
import axios from 'axios'

export const useConfirmUser = defineStore({
    id: 'userConfirm',
    state: () => {
        return {
            name: 0,
            mail: 'example@com',
            picture: 'https://xxx.sample.com',
            storageFileName: 'default.png',
        }
    },
    getters: {

    },
    actions: {
        setUserConfirm(name, mail, picture, storageFileName) {
            this.name = name
            this.mail = mail
            this.picture = picture
            this.storageFileName = storageFileName
        },

        async createUser() {
            const response = await axios.post('http://localhost:8080/api/user/create', {
                name: this.name,
                mail: this.mail,
                picture: this.picture,
                storageFileName: this.storageFileName
            })
            console.log(response.data)
        }
    }
})