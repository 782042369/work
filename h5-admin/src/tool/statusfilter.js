/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 状态过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-15 16:19:03
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
 * @param {*} value 传入number 输出节点汉字
 */
export const typefilter = (value) => {
  let val = {
    1: '模块',
    2: '菜单',
    3: '操作',
  } [value]
  return val
}
/**
 * 
 * @param {*} value 传入数字 输出属性汉子
 */
export const typeattributeilter = (value) => {
  let val = {
    1: '单行录入',
    2: '多行录入',
    3: '选择录入',
  } [value]
  return val
}
