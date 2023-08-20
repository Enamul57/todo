import { createWebHistory, createRouter } from "vue-router";

import register_admin from './dashboard/admin/auth/register_admin.vue';
import login_admin from './dashboard/admin/auth/login_admin.vue';
import admin_dashboard from './dashboard/admin/admin_dashboard.vue';

import todo from './pages/todo/todo.vue';

const routes = [





    {
        path: '/',
        name: 'register_admin',
        component: register_admin,
    },
    {
        path: '/admin/login',
        name: 'login_admin',
        component: login_admin,
    },
    {
        path: '/admin/dashboard',
        name: 'admin_dashboard',
        component: admin_dashboard,
    },
    {
        path: '/todo',
        name: 'todo',
        component: todo,
    }


];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
});

export default router;
