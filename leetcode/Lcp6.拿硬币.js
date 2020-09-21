/**
 * @param {number[]} coins
 * @return {number}
 */
var minCount = function (coins) {
    let num = 0;
    for (let i = 0; i < coins.length; i++) {
        coins[i] % 2 === 0
            ? (num += coins[i] / 2)
            : (num += (coins[i] + 1) / 2);
    }
    return num;
};
minCount([4, 2, 1]);
minCount([2, 3, 10]);
