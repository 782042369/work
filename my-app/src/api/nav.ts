/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: nav
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-24 15:28:18
 */

import request from '../tool/request'

export function navlist(data?: object) {
	// 列表
	return request({
		url: 'admin/navlist',
		method: 'post',
		data
	})
}

export function addnav(data?: object) {
	// 增加
	return request({
		url: 'admin/Addnav',
		method: 'post',
		data
	})
}
export function editnav(data?: object) {
	// 修改
	return request({
		url: 'admin/editnav',
		method: 'put',
		data
	})
}
export function deletenav(data?: object) {
	// 删除
	return request({
		url: 'admin/Deletenav',
		method: 'delete',
		data
	})
}
export function auth(data?: object) {
	// 授权
	return request({
		url: 'admin/auth',
		method: 'post',
		data
	})
}

export function authlist(params?: object) {
	// 授权
	return request({
		url: 'admin/authlist',
		method: 'get',
		params
	})
}
