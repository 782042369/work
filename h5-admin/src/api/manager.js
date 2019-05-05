/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-05 17:11:02
 */

import request from '../tool/request'

export function nodeList(params) {
  // 分页列表
  return request({
    url: 'runningNode/list',
    method: 'get',
    params
  })
}
