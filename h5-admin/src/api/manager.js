/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: manger
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-07 11:07:38
 */

import request from '../tool/request'
export function managerlist(data) {
  // 列表
  return request({
    url: 'adminManagerlist',
    method: 'post',
    data
  })
}

export function addmanager(data) {
  // 增加
  return request({
    url: 'adminAddManager',
    method: 'post',
    data
  })
}
export function editmanager(data) {
  // 修改
  return request({
    url: 'adminEditManager',
    method: 'put',
    data
  })
}
export function deletemanager(data) {
  // 删除
  return request({
    url: 'adminDeleteManager',
    method: 'delete',
    data
  })
}
