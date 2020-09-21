// @Author: 杨宏旋
// @Date: 2020-09-16 14:35:42
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-16 14:44:00
// @Description: LCP 17. 速算机器人
/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
    const arr = s.split('');
    let x = 1;
    let y = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i] === 'A' ? (x = 2 * x + y) : (y = 2 * y + x);
    }
    return x + y;
};
calculate('AB');
