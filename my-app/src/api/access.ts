/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: access
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-24 15:27:45
 */

import request from '../tool/request'

export function accesslist(data?: object) {
	// 列表
	return request({
		url: 'admin/Accesslist',
		method: 'post',
		data
	})
}
export function addaccess(data?: object) {
	// 增加
	return request({
		url: 'admin/AddAccess',
		method: 'post',
		data
	})
}
export function editaccess(data?: object) {
	// 修改
	return request({
		url: 'admin/EditAccess',
		method: 'put',
		data
	})
}
export function deleteaccess(data?: object) {
	// 删除
	return request({
		url: 'admin/DeleteAccess',
		method: 'delete',
		data
	})
}
export function findaccesslist(data?: object) {
	// 删除
	return request({
		url: 'admin/FindAccessList',
		method: 'get',
		data
	})
}
