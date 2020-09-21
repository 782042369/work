/* eslint-disable no-throw-literal */
/*
 * @Author: 杨宏旋
 * @Date: 2020-09-16 14:45:15
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-09-16 14:53:10
 * @Description: LCP 01. 猜数字
 */
/**
 * @param {number[]} guess
 * @param {number[]} answer
 * @return {number}
 */
const game = function (guess, answer) {
    if (guess.length !== 3 || answer.length !== 3) {
        throw '数据有误';
    }
    // let count = 0;
    // for (let i = 0; i < guess.length; i++) {
    //     guess[i] === answer[i] && count++;
    // }
    // return count;
    return guess.filter((ele, index) => ele === answer[index]).length;
};
game([1, 2, 3], [1, 2, 3]);
console.log('game([1, 2, 3], [1, 2, 3]): ', game([1, 2, 3], [1, 2, 3]));
game([2, 2, 3], [3, 2, 1]);
console.log('game([2, 2, 3], [3, 2, 1]): ', game([2, 2, 3], [3, 2, 1]));
