import axios from 'axios';
var address = 'http://test.linkfeeling.cn/api/platform/link/';
export default {
    install (Vue) {
        // process.env.NODE_ENV !== 'production'
        Vue.prototype.client = {
            request: function (data, method) {
                return axios
                    .post(
                        address + method,
                        JSON.stringify(data),
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                // .then(res => {
                //     var data = res.data.data;
                //     console.log('akak', data);
                // })
                // .catch(res => {
                //     console.log(res);
                // });
            }
        };
    }
};
