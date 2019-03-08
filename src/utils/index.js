/**
 *
 * @param {Promise} p
 */
export function wrapAjaxToPromise (p) {
    return p.then((response) => {
        if (response.data.code == 200) {
            return {
                success: true,
                data: response.data.data
            };
        }
        return {
            success: false,
            data: response.data.message,
            message: response.data.message
        };
    }, (err) => {
        console.log(err);
        return {
            success: false,
            data: '网络异常'
        };
    });
}
