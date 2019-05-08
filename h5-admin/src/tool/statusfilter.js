/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 状态过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-08 12:48:14
 */
/**
 * 
 * @param {*} timestamp 传入类型 输出状态汉字
 */
export const statusfilter = timestamp => {
  let val = {
    1: '启用',
    0: '停用'
  } [timestamp]
  return val
}
/**
 * 
 * @param {*} value  传入number 输出节点汉字
 */
export const typefilter = function name(value) {
  let val = {
    1: '模块',
    2: '菜单',
    3: '操作',
  } [value]
  return val
}
