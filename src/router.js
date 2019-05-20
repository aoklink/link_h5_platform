import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import BaseBind from './components/BaseBind.vue';
import BaseList from './components/BaseList.vue';
import {
    isLogin
} from './utils/auth';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        name: 'Login',
        path: '/Login',
        component: Login,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
        children: []
    },
    {
        name: 'basebind',
        path: '/BaseBind',
        component: BaseBind,
        displayName: '手环管理',
        meta: {
            keepAlive: true
        },
    },
    {
        name: 'baselist',
        path: '/BaseList',
        component: BaseList,
        displayName: '店铺手环信息',
        meta: {
            keepAlive: true
        },
    }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogin()) {
            router.push({
                name: 'Login',
                query: {
                    from: to.path
                }
            });
            return;
        }
    }
    next();
});

export default router;
