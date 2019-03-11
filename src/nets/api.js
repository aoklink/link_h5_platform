const PREFIX = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.1.250:8045';

export const LOGIN = `${PREFIX}/api/login`;
export const GET_OSS_SESSION = `${PREFIX}/img`;

export const USER_ADD = `${PREFIX}/api/user/add`;
export const USER_VERIFY = `${PREFIX}/api/user/verify`;
export const GYM_ADMIN_USER_ADD = `${PREFIX}/api/gym_admin_user/add`;
export const GYM_ADMIN_USER_UPDATE = `${PREFIX}/api/gym_admin_user/update`;
export const GYM_ADMIN_USER_VERIFY = `${PREFIX}/api/gym_admin_user/verify`;
export const GYM_CLASS_ADD = `${PREFIX}/api/gym_class/add`;
export const GYM_CLASS_GET = `${PREFIX}/api/gym_class/get`;
export const GYM_CLASS_UPDATE = `${PREFIX}/api/gym_class/update`;
export const GYM_CLASS_DELETE = `${PREFIX}/api/gym_class/delete`;
export const GYM_CLASS_LIST = `${PREFIX}/api/gym_class/list`;
export const GYM_CLASS_GET_ME = `${PREFIX}/api/gym_class/get_me`;
export const GYM_CLASS_ADD_ME = `${PREFIX}/api/gym_class/add_me`;
export const GYM_CLASS_DELETE_ME = `${PREFIX}/api/gym_class/delete_me`;
export const GYM_CLASS_UPDATE_ME = `${PREFIX}/api/gym_class/update_me`;
export const GYM_CLASS_LIST_ALL = `${PREFIX}/api/gym_class/list_all`;
export const GYM_CLASS_LIST_ME = `${PREFIX}/api/gym_class/list_me`;
export const GYM_COACH_ADD = `${PREFIX}/api/gym_coach/add`;
export const GYM_COACH_GET = `${PREFIX}/api/gym_coach/get`;
export const GYM_COACH_UPDATE = `${PREFIX}/api/gym_coach/update`;
export const GYM_COACH_DELETE = `${PREFIX}/api/gym_coach/delete`;
export const GYM_COACH_LIST = `${PREFIX}/api/gym_coach/list`;
export const GYM_COACH_GET_ME = `${PREFIX}/api/gym_coach/get_me`;
export const GYM_COACH_ADD_ME = `${PREFIX}/api/gym_coach/add_me`;
export const GYM_COACH_DELETE_ME = `${PREFIX}/api/gym_coach/delete_me`;
export const GYM_COACH_UPDATE_ME = `${PREFIX}/api/gym_coach/update_me`;
export const GYM_COACH_LIST_ALL = `${PREFIX}/api/gym_coach/list_all`;
export const GYM_COACH_LIST_ME = `${PREFIX}/api/gym_coach/list_me`;
export const GYM_COMMON_GET = `${PREFIX}/api/gym_common/get`;
export const GYM_COMMON_DELETE = `${PREFIX}/api/gym_common/delete`;
export const GYM_COMMON_GET_ME = `${PREFIX}/api/gym_common/get_me`;
export const GYM_GROUP_USER_ADD = `${PREFIX}/api/gym_group_user/add`;
export const GYM_GROUP_USER_UPDATE = `${PREFIX}/api/gym_group_user/update`;
export const GYM_GROUP_USER_VERIFY = `${PREFIX}/api/gym_group_user/verify`;
export const GYM_INFO_ADD = `${PREFIX}/api/gym_info/add`;
export const GYM_INFO_GET = `${PREFIX}/api/gym_info/get`;
export const GYM_INFO_GET_ME = `${PREFIX}/api/gym_info/get_me`;
export const GYM_INFO_LIST_GROUP = `${PREFIX}/api/gym_info/list_group`;
export const GYM_INFO_LIST_ALL = `${PREFIX}/api/gym_info/list_all`;
export const GYM_INFO_UPDATE_ME = `${PREFIX}/api/gym_info/update_me`;
export const GYM_INFO_UPDATE = `${PREFIX}/api/gym_info/update`;
export const GYM_INFO_DELETE = `${PREFIX}/api/gym_info/delete`;
