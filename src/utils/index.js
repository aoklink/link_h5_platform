/**
 *
 * @param {Promise} p
 */
export function wrapAjaxToPromise (p) {
    return p.then((response) => {
        // console.log("reponse ",response.data.code, response.data.data)
        let msg = response.data.message || response.data.msg
        if (response.data.code == 200) {
            return {
                success: true,
                data: response.data.data
            };
        }
        return {
            success: false,
            data: msg,
            message: msg
        };
    }, (err) => {
        console.log(err);
        return {
            success: false,
            data: '网络异常'
        };
    });
}

/**
 *
 * @param {Object} obj
 * @param {Array<Object>} rules
 */
export function verifyEmptyHelper (obj, rules) {
    let msg = '';
    let valid = true;
    for (let rule of rules) {
        let val = obj[rule.field];
        if (!val) {
            msg = `${rule.label}不能为空`;
            valid = false;
        }
    }
    return {
        valid,
        msg
    };
}
