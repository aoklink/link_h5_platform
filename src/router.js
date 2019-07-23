import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import BaseBind from './components/BaseBind.vue';
import ShopBind from './components/ShopBind.vue';
import ShopCoordinate from './components/ShopCoordinate.vue';
import BaseCoordinate from './components/BaseCoordinate.vue';
import ShopSensor from './components/ShopSensor.vue';
import BaseSensor from './components/BaseSensor.vue';
import ShopTest from './components/ShopTest.vue';

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
            requiresAuth: true,
            keepAlive: true
        },
    },
    {
        name: 'shopbind',
        path: '/ShopBind',
        component: ShopBind,
        displayName: '店铺手环信息',
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
    },
    {
        name: 'shopcoordinate',
        path: '/ShopCoordinate',
        component: ShopCoordinate,
        displayName: '坐标设置',
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
    },
    {
        name: 'basecoordinate',
        path: '/BaseCoordinate',
        component: BaseCoordinate,
        displayName: '店铺坐标信息',
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
    },
    {
        name: 'shopsensor',
        path: '/ShopSensor',
        component: ShopSensor,
        displayName: '传感器管理',
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
    },
    {
        name: 'basesensor',
        path: '/BaseSensor',
        component: BaseSensor,
        displayName: '店铺传感器信息',
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
    },
    {
        name: 'shoptest',
        path: '/ShopTest',
        component: ShopTest,
        displayName: '试用管理',
        meta: {
            requiresAuth: true,
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
    }else{
        console.log(2222)
    }
    next();
});

export default router;
