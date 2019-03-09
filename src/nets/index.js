import * as api from './api';
import http from 'axios';
import qs from 'qs';
import {
    wrapAjaxToPromise
} from '../utils';

const axios = http.create({
    timeout: 15000,
    withCredentials: true
});
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
    return wrapAjaxToPromise(axios.post(api.USER_ADD, qs.stringify(payload)));
}

export function userVerify (payload) {
    return wrapAjaxToPromise(axios.post(api.USER_VERIFY, qs.stringify(payload)));
}

export function gymAdminUserAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_ADD, qs.stringify(payload)));
}

export function gymAdminUserUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_UPDATE, qs.stringify(payload)));
}

export function gymAdminUserVerify (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_ADMIN_USER_VERIFY, qs.stringify(payload)));
}

export function gymClassAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_ADD, qs.stringify(payload)));
}

export function gymClassGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_GET, qs.stringify(payload)));
}

export function gymClassUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_UPDATE, qs.stringify(payload)));
}

export function gymClassDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_DELETE, qs.stringify(payload)));
}

export function gymClassList (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_LIST, qs.stringify(payload)));
}

export function gymClassGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_GET_ME, qs.stringify(payload)));
}

export function gymClassAddMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_ADD_ME, qs.stringify(payload)));
}

export function gymClassDeleteMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_DELETE_ME, qs.stringify(payload)));
}

export function gymClassUpdateMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_UPDATE_ME, qs.stringify(payload)));
}

export function gymClassListAll (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_LIST_ALL, qs.stringify(payload)));
}

export function gymClassListMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_CLASS_LIST_ME, qs.stringify(payload)));
}

export function gymCoachAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_ADD, qs.stringify(payload)));
}

export function gymCoachGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_GET, qs.stringify(payload)));
}

export function gymCoachUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_UPDATE, qs.stringify(payload)));
}

export function gymCoachDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_DELETE, qs.stringify(payload)));
}

export function gymCoachList (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_LIST, qs.stringify(payload)));
}

export function gymCoachGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_GET_ME, qs.stringify(payload)));
}

export function gymCoachAddMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_ADD_ME, qs.stringify(payload)));
}

export function gymCoachDeleteMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_DELETE_ME, qs.stringify(payload)));
}

export function gymCoachUpdateMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_UPDATE_ME, qs.stringify(payload)));
}

export function gymCoachListAll (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_LIST_ALL, qs.stringify(payload)));
}

export function gymCoachListMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COACH_LIST_ME, qs.stringify(payload)));
}

export function gymCommonGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COMMON_GET, qs.stringify(payload)));
}

export function gymCommonDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COMMON_DELETE, qs.stringify(payload)));
}

export function gymCommonGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_COMMON_GET_ME, qs.stringify(payload)));
}

export function gymGroupUserAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_GROUP_USER_ADD, qs.stringify(payload)));
}

export function gymGroupUserUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_GROUP_USER_UPDATE, qs.stringify(payload)));
}

export function gymGroupUserVerify (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_GROUP_USER_VERIFY, qs.stringify(payload)));
}

export function gymInfoAdd (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_ADD, qs.stringify(payload)));
}

export function gymInfoGet (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_GET, qs.stringify(payload)));
}

export function gymInfoGetMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_GET_ME, qs.stringify(payload)));
}

export function gymInfoListGroup (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_LIST_GROUP, qs.stringify(payload)));
}

export function gymInfoListAll (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_LIST_ALL, qs.stringify(payload)));
}

export function gymInfoUpdateMe (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_UPDATE_ME, qs.stringify(payload)));
}

export function gymInfoUpdate (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_UPDATE, qs.stringify(payload)));
}

export function gymInfoDelete (payload) {
    return wrapAjaxToPromise(axios.post(api.GYM_INFO_DELETE, qs.stringify(payload)));
}
