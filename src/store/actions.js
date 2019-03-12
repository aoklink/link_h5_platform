import * as types from './action_type';
import * as nets from '../nets';
import * as mutationTypes from './mutation_type';
import * as persistence from './persistence';

export default {
    async [types.LOGIN] ({
        commit
    }, payload) {
        let result = await nets.login(payload);
        if (result.success) {
            commit(mutationTypes.AUTHORIZATION, true);
            commit(mutationTypes.MUTATE_USERINFO, result.data.user);
            persistence.saveMyInfo(result.data.user);
        }
        return result;
    },
    [types.LOGOUT] ({
        commit
    }) {
        commit(mutationTypes.AUTHORIZATION, false);
    },
    async [types.VERIFY_AUTH] () {
        let result = await nets.gymInfoListAll();
        return result;
    },
    async [types.GET_ALL_GYM_INFO] ({
        commit
    }) {
        let result = await nets.gymInfoListAll();
        if (result.success) {
            commit(mutationTypes.MUTATE_GYM_INFO_LIST, result.data.map(item => ({
                city: item.city,
                id: item.id,
                name: item.name,
                memberCount: item.member_count,
                gymAdminUserId: item.gym_admin_user && item.gym_admin_user.id,
                gymAdminUserName: item.gym_admin_user && item.gym_admin_user.name,
                gymAdminUserPhone: item.gym_admin_user && item.gym_admin_user.phone
            })));
        }
        return result;
    },
    async [types.GET_GYM_INFO] ({commit}, payload) {
        let result = await nets.gymInfoGet(payload);
        return result;
    },
    async [types.ADD_GYM] ({dispatch}, payload) {
        let result = await nets.gymInfoAdd(payload);
        if (result.success) {
            dispatch(types.GET_ALL_GYM_INFO);
        }
        return result;
    },
    async [types.ADD_COASH] ({commit}, payload) {
        let result = await nets.gymCoachAdd(payload);
        return result;
    },
    async [types.DELETE_GYM] ({dispatch}, payload) {
        let result = await nets.gymInfoDelete(payload);
        if (result.success) {
            dispatch(types.GET_ALL_GYM_INFO);
        }
        return result;
    },
    async [types.GET_COACH_LIST_BY_GYMID] ({commit}, payload) {
        let result = await nets.gymCoachList(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_COACH_INFO_LIST_SELECTED, result.data);
        }
        return result;
    },
    async [types.ADD_GYM_ADMIN] (_, payload) {
        let result = await nets.gymAdminUserAdd(payload);
        return result;
    },
    async [types.GET_OSS_SESSION] ({commit}, payload) {
        let result = await nets.getOSSSession(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_OSS_SESSION, result.data);
        }
        return result;
    },
    async [types.ADD_CLASS_INFO] ({dispatch}, payload) {
        let result = await nets.gymClassAdd(payload);
        if (result.success) {
            dispatch(types.GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: result.data.gym_id});
        }
        return result;
    },
    async [types.GET_CLASS_INFO_LIST_BY_GYMID] ({commit}, payload) {
        let result = await nets.gymClassList(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_CLASS_INFO_LIST_SELECTED, result.data);
        }
        return result;
    },
    async [types.EDIT_GYM] ({dispatch}, payload) {
        let result = await nets.gymInfoUpdate(payload);
        if (result.success) {
            dispatch(types.GET_ALL_GYM_INFO);
        }
        return result;
    },
    async [types.EDIT_CLASS_INFO] ({dispatch}, payload) {
        let result = await nets.gymClassUpdate(payload);
        if (result.success) {
            dispatch(types.GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: payload.gym_id});
        }
        return result;
    },
    async [types.GET_GYM_ADMIN_USER_GET_BIND] ({commit}, payload) {
        let result = await nets.gymAdminUserBindGet(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_GYM_ADMIN_INFO_SELECTED, result.data);
        }
        return result;
    }
};
