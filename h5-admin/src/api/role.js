/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 18:54:50
 */

import request from '../tool/request'

export function rolelist(data) {
  // 列表
  return request({
    url: '/admin/rolelist',
    method: 'post',
    data
  })
}

export function addrole(data) {
  // 增加
  return request({
    url: 'admin/role/add',
    method: 'put',
    data
  })
}
export function editrole(data) {
  // 增加
  return request({
    url: 'admin/role/edit',
    method: 'put',
    data
  })
}
