// @Author: 杨宏旋
// @Date: 2020-09-16 14:56:17
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-16 14:59:23
// @Description:
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
    return S.split('').filter((ele) => J.includes(ele));
};
numJewelsInStones('aA', 'aAAbbbb');
numJewelsInStones('z', 'ZZ');
