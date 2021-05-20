/*
 * @Author: 杨宏旋
 * @Date: 2021-05-20 14:26:38
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-20 14:54:52
 * @Description:
 */
const sku = 'goods1'
const skulist = [
  ['red', 'blur', 'green'],
  ['x', 'xs', 'l'],
  // ['a', 'a1', 'a2'],
  // ['b', 'b1', 'b2'],
]
/**
 * skulist 生成
 * @param {*} key sku
 * @param {*} list skulist
 * @param {*} symbol 分隔符
 * @returns [
    'goods1-red-x',
    'goods1-red-xs',
    'goods1-red-l',
    'goods1-blur-x',
    'goods1-blur-xs',
    'goods1-blur-l',
    'goods1-green-x',
    'goods1-green-xs',
    'goods1-green-l'
  ]
 */
const creatSku = (key, list, symbol) => {
  return list
    .reduce(
      (prev, current) => {
        const ret = []
        prev.map((a) => current.map((b) => ret.push([...a, b])))
        return ret
      },
      [[]]
    )
    .map((ele) => `${key}${symbol}${ele.join(symbol)}`)
}
const a = creatSku(sku, skulist, '-')
console.log('a: ', a)
