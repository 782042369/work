/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: access
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 20:39:50
 */

import request from '../tool/request'

export function rolelist(data) {
  // 列表
  return request({
    url: 'adminAccesslist',
    method: 'post',
    data
  })
}

export function addrole(data) {
  // 增加
  return request({
    url: 'adminAddAccess',
    method: 'put',
    data
  })
}
export function editrole(data) {
  // 修改
  return request({
    url: 'adminEditAccess',
    method: 'put',
    data
  })
}
export function deleterole(data) {
  // 删除
  return request({
    url: 'adminDeleteAccess',
    method: 'delete',
    data
  })
}
