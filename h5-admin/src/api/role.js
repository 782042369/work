/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-09 13:10:10
 */

import request from '../tool/request'

export function rolelist(data) {
	// 列表
	return request({
		url: 'admin/Rolelist',
		method: 'post',
		data
	})
}

export function addrole(data) {
	// 增加
	return request({
		url: 'admin/AddRole',
		method: 'post',
		data
	})
}
export function editrole(data) {
	// 修改
	return request({
		url: 'admin/EditRole',
		method: 'put',
		data
	})
}
export function deleterole(data) {
	// 删除
	return request({
		url: 'admin/DeleteRole',
		method: 'delete',
		data
	})
}
export function auth(data) {
	// 授权
	return request({
		url: 'admin/auth',
		method: 'post',
		data
	})
}

export function authlist(params) {
	// 授权
	return request({
		url: 'admin/authlist',
		method: 'get',
		params
	})
}
