// @Author: 杨宏旋
// @Date: 2020-09-16 16:58:32
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-16 16:59:50
// @Description:
/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function (address) {
    return address.replace(/\./g, '[.]');
};
defangIPaddr('1.1.1.1');
defangIPaddr('255.100.50.0');
