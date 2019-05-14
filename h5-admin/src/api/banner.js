/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 轮播图
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-14 16:17:34
 */
import request from '../tool/request'

export function addbanner(data) {
  // 增加banner
  return request({
    url: 'admin/addbanner',
    method: 'post',
    data
  })
}
export function editbanner(data) {
  // 修改banner
  return request({
    url: 'admin/editbanner',
    method: 'post',
    data
  })
}

export function bannerlist(data) {
  // 修改banner
  return request({
    url: 'admin/bannerlist',
    method: 'post',
    data
  })
}

export function deletebanner(data) {
  // 修改banner
  return request({
    url: 'admin/deletebanner',
    method: 'delete',
    data
  })
}
