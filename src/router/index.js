import { createRouter, createWebHistory } from 'vue-router'
import TopMenu from '../views/TopMenu.vue'
import UserList from '../views/UserList.vue'
import UserCreate from '../views/UserCreate.vue'
import UserCreateConfirm from '../views/UserCreateConfirm.vue'
import UserUpdate from '../views/UserUpdate.vue'
import UserUpdateConfirm from '../views/UserUpdateConfirm.vue'

import UserDeleteConfirm from '../views/UserDeleteConfirm.vue'
import PropsTest02 from '../views/PropsTest02.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top_menu',
      component: TopMenu,
    },
    {
      path: '/user',
      name: 'user_list',
      component: UserList,
    },
    {
      path: '/user/:requestedPage',
      name: 'user_list_with_page',
      component: UserList,
    },
    {
      path: '/user/create',
      name: 'user_create',
      component: UserCreate,
    },
    {
      path: '/user/create/confirm',
      name: 'user_create_conrifm',
      component: UserCreateConfirm,

    },
    {
      path: '/user/update/:id',
      name: 'user_update',
      component: UserUpdate,
    },
    {
      path: '/user/update/confirm',
      name: 'user_update_confirm',
      component: UserUpdateConfirm,
    },
    {
      path: '/user/delete/confirm/:id',
      name: 'user_delete_confirm',
      component: UserDeleteConfirm,
    },
    {
      path: '/props-test',
      name: 'props_test',
      component: PropsTest02
    },
  ]
})

export default router
