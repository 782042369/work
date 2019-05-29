/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-28 19:28:20
 */

import request from '../tool/request';

// 读取设置
export function getsetting(data) {
  return request({
    url: 'admin/getsetting',
    method: 'post',
    data
  });
}

// 修改设置
export function editsetting(data) {
  return request({
    url: 'admin/editsetting',
    method: 'put',
    data
  });
}
