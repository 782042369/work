/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 时间过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-06 18:09:59
 */
const statusfilter = (timestamp) => {
  let val = {
    1: '启用',
    0: '停用'
  } [timestamp]
  return val
}
export default statusfilter;
