import * as api from './api';
import http from 'axios';
import qs from 'qs';
import {
    wrapAjaxToPromise
} from '../utils';
import router from '../router';

const axios = http.create({
    timeout: 15000,
    withCredentials: true
});

http.interceptors.response.use(
    function (response) {
        const res = response.data;
        // if (res.code !== 200) {
        //     let mes;
        //     switch (res.code) {
        //     case 401:
        //         mes = '登录超时，请重新登录';
        //         router.push('/Login');
        //         break;
        //     }
        //     mes = mes || res.message;
        //     return Promise.reject(mes);
        // } else {
        //     return response;
        // }
        if (res.code == 200) {
            return response;
        } else if(res.code == 401){
            mes = '登录超时，请重新登录';
            router.push('/Login');
            let mes;
            mes = mes || res.message || res.msg;
            return Promise.reject(mes);
        } else {
            return response;
        }
    },
    error => {
        console.log('err' + error);// for debug
        return Promise.reject(error.message);
    }
);

export function getOSSSession (payload) {
    return wrapAjaxToPromise(http.create({timeout: 15000}).get(api.GET_OSS_SESSION).then(res => {
        res.data.data = {...res.data};
        res.data.code = 200;
        return res;
    }));
}

export function login (payload) {
    return wrapAjaxToPromise(axios.post(api.LOGIN, qs.stringify(payload)));
}

export function userAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.USER_ADD, payload));
}

export function userVerify (payload) {
    return wrapAjaxToPromise(axios.post(api.USER_VERIFY, payload));
}

export function gymAdminUserAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_ADD, payload));
}

export function gymAdminUserUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_UPDATE, payload));
}

export function gymAdminUserBindGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_GET_BIND, payload));
}

export function gymAdminUserVerify (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_VERIFY, payload));
}

export function gymClassAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_ADD, payload));
}

export function gymClassGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_GET, payload));
}

export function gymClassUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_UPDATE, payload));
}

export function gymClassDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_DELETE, payload));
}

export function gymClassList (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_LIST, payload));
}

export function gymClassGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_GET_ME, payload));
}

export function gymClassAddMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_ADD_ME, payload));
}

export function gymClassDeleteMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_DELETE_ME, payload));
}

export function gymClassUpdateMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_UPDATE_ME, payload));
}

export function gymClassListAll (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_LIST_ALL, payload));
}

export function gymClassListMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_LIST_ME, payload));
}

export function gymCoachAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_ADD, payload));
}

export function gymCoachGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_GET, payload));
}

export function gymCoachUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_UPDATE, payload));
}

export function gymCoachDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_DELETE, payload));
}

export function gymCoachList (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_LIST, payload));
}

export function gymCoachGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_GET_ME, payload));
}

export function gymCoachAddMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_ADD_ME, payload));
}

export function gymCoachDeleteMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_DELETE_ME, payload));
}

export function gymCoachUpdateMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_UPDATE_ME, payload));
}

export function gymCoachListAll (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_LIST_ALL, payload));
}

export function gymCoachListMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_LIST_ME, payload));
}

export function gymCommonGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COMMON_GET, payload));
}

export function gymCommonDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COMMON_DELETE, payload));
}

export function gymCommonGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COMMON_GET_ME, payload));
}

export function gymGroupUserAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_GROUP_USER_ADD, payload));
}

export function gymGroupUserUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_GROUP_USER_UPDATE, payload));
}

export function gymGroupUserVerify (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_GROUP_USER_VERIFY, payload));
}

export function gymInfoAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_ADD, payload));
}

export function gymInfoGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_GET, payload));
}

export function gymInfoGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_GET_ME, payload));
}

export function gymInfoListGroup (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_LIST_GROUP, payload));
}

export function gymInfoListAll (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_LIST_ALL, payload));
}

export function gymInfoUpdateMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_UPDATE_ME, payload));
}

export function gymInfoUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_UPDATE, payload));
}

export function gymInfoDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_DELETE, payload));
}

export function gymInfoTestList (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_TEST_LIST, payload));
}

// export function gymInfoListAll (payload) {
//     return wrapAjaxToPromise(axios.post(api.GYM_INFO_LIST_ALL, payload));
// }
export function gymPlayCoachList (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_PLAY_COACH_LIST, payload));
}
// 教程管理
export function deviceAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.DEVICE_ADD, payload));
}
export function learnList (payload) {
    return wrapAjaxToPromise(axios.post(api.LEARN_LIST, payload));
}
export function learnItem (payload) {
    return wrapAjaxToPromise(axios.post(api.LEARN_ITEM, payload));
}
export function learnAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.LEARN_ADD, payload));
}
export function learnUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.LEARN_UPDATE, payload));
}
export function deviceList (payload) {
    return wrapAjaxToPromise(axios.post(api.DEVICE_LIST, payload));
}