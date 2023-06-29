import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore({
    id: 'users',
    state: () => {
        return {
            isLoading: true,
            pageNo: 0,
            totalCount: 0,
            numPerPage: 0,
            pageAllCount: 0,
            users: [
                {
                    'id': 0,
                    'name': '',
                    'mail': '',
                    'picture': '',
                    'storage_file_name': '',
                },
            ]
        }
    },
    getters: {

    },
    actions: {
        async getUserList(wantedPage){
            const response = await axios.get('http://localhost:8080/api/user/page/' + wantedPage )
            this.pageNo = Number(response.data.pageNo);
            this.totalCount = Number(response.data.totalCount);
            this.numPerPage = Number(response.data.numPerPage);
            this.users = response.data.users;
            this.isLoading = false;
            this.pageAllCount = Math.ceil(this.totalCount / this.numPerPage);
        },

    }
})