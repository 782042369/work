/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: access
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-08 13:43:42
 */

import request from '../tool/request'

export function accesslist(data) {
  // 列表
  return request({
    url: 'admin/Accesslist',
    method: 'post',
    data
  })
}
export function addaccess(data) {
  // 增加
  return request({
    url: 'admin/AddAccess',
    method: 'post',
    data
  })
}
export function editaccess(data) {
  // 修改
  return request({
    url: 'admin/EditAccess',
    method: 'put',
    data
  })
}
export function deleteaccess(data) {
  // 删除
  return request({
    url: 'admin/DeleteAccess',
    method: 'delete',
    data
  })
}
export function findaccesslist(data) {
  // 删除
  return request({
    url: 'admin/FindAccessList',
    method: 'get',
    data
  })
}
