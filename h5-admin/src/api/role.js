/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 20:33:56
 */

import request from '../tool/request'

export function rolelist(data) {
  // 列表
  return request({
    url: 'adminRolelist',
    method: 'post',
    data
  })
}

export function addrole(data) {
  // 增加
  return request({
    url: 'adminAddRole',
    method: 'put',
    data
  })
}
export function editrole(data) {
  // 修改
  return request({
    url: 'adminEditRole',
    method: 'put',
    data
  })
}
export function deleterole(data) {
  // 删除
  return request({
    url: 'adminDeleteRole',
    method: 'delete',
    data
  })
}
