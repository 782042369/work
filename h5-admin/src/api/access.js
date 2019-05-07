/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: access
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-07 09:46:46
 */

import request from '../tool/request'

export function accesslist(data) {
  // 列表
  return request({
    url: 'adminAccesslist',
    method: 'post',
    data
  })
}

export function addaccess(data) {
  // 增加
  return request({
    url: 'adminAddAccess',
    method: 'put',
    data
  })
}
export function editaccess(data) {
  // 修改
  return request({
    url: 'adminEditAccess',
    method: 'put',
    data
  })
}
export function deleteaccess(data) {
  // 删除
  return request({
    url: 'adminDeleteAccess',
    method: 'delete',
    data
  })
}
