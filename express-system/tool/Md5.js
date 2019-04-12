/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: md5 加密
 * @Date: 2019-04-12 15:34:14
 * @LastEditTime: 2019-04-12 16:14:30
 */
import md5 from 'md5-node';
const md5model = function (params) {
  return md5(params);
}
export {
  md5model
};
