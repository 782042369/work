/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: manger
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 18:27:50
 */

import request from '../tool/request'

export function mangerlist(data) {
  // 分页列表
  return request({
    url: '/admin/mangerlist',
    method: 'get',
    data
  })
}

export function addmanger(data) {
  // 分页列表
  return request({
    url: 'admin/manger/add',
    method: 'put',
    data
  })
}
