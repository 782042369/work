/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-15 12:27:54
 */

import request from '../tool/request'

export function goodstypelist(data) {
	// 列表
	return request({
		url: 'admin/goodstypelist',
		method: 'post',
		data
	})
}

export function deletegoodstype(data) {
	// 删除
	return request({
		url: 'admin/deletegoodstype',
		method: 'delete',
		data
	})
}
