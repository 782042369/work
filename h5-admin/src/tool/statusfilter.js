/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 状态过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-07 09:56:20
 */
/**
 * 
 * @param {*} timestamp 传入类型 输出状态汉字
 */
const statusfilter = (timestamp) => {
  let val = {
    1: '启用',
    0: '停用'
  } [timestamp]
  return val
}
export default statusfilter;
