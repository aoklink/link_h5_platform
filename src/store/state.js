import {
    isLogin
} from '../utils/auth';
import * as persistence from './persistence';

export const initVal = {
    authorization: isLogin(),
    userInfo: persistence.getMyInfo(),
    gymInfoList: [],
    gymInfoListSelected: [],
    coachInfoListSelected: [],
    classInfoListSelected: [],
    OSSsession: {}
};

export default {
    ...initVal
};
