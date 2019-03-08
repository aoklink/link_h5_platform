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
                gymAdminUserPhone: item.gym_admin_user && item.gym_admin_userphone
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
    }
};
