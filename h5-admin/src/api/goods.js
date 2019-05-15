/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-15 14:13:41
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
export function addgoods(data) {
	// 增加
	return request({
		url: 'admin/addgoods',
		method: 'post',
		data
	})
}

export function editgoods(data) {
	// 修改
	return request({
		url: 'admin/editgoods',
		method: 'put',
		data
	})
}
