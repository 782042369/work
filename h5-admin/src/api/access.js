/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: access
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 18:27:56
 */

import request from '../tool/request'

export function accesslist(data) {
  // 分页列表
  return request({
    url: '/admin/accesslist',
    method: 'get',
    data
  })
}

export function addaccess(data) {
  // 分页列表
  return request({
    url: 'admin/access/add',
    method: 'put',
    data
  })
}
