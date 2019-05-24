/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: nav
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-24 10:25:04
 */

import request from '../tool/request';

export function navlist(data) {
	// 列表
	return request({
		url: 'admin/navlist',
		method: 'post',
		data
	});
}

export function addnav(data) {
	// 增加
	return request({
		url: 'admin/Addnav',
		method: 'post',
		data
	});
}
export function editnav(data) {
	// 修改
	return request({
		url: 'admin/Editnav',
		method: 'put',
		data
	});
}
export function deletenav(data) {
	// 删除
	return request({
		url: 'admin/Deletenav',
		method: 'delete',
		data
	});
}
export function auth(data) {
	// 授权
	return request({
		url: 'admin/auth',
		method: 'post',
		data
	});
}

export function authlist(params) {
	// 授权
	return request({
		url: 'admin/authlist',
		method: 'get',
		params
	});
}
