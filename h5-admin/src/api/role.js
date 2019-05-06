/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 17:48:42
 */

import request from '../tool/request'

export function rolelist(data) {
  // 分页列表
  return request({
    url: '/admin/rolelist',
    method: 'get',
    data
  })
}

export function addrole(data) {
  // 分页列表
  return request({
    url: 'admin/role/add',
    method: 'put',
    data
  })
}
