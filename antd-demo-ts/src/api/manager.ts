/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: manger
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-07 11:07:38
 */

import request from '../tool/request'
export function managerlist(data?: object) {
	// 列表
	return request({
		url: 'admin/Managerlist',
		method: 'post',
		data
	})
}

export function addmanager(data?: object) {
	// 增加
	return request({
		url: 'admin/AddManager',
		method: 'post',
		data
	})
}
export function editmanager(data?: object) {
	// 修改
	return request({
		url: 'admin/EditManager',
		method: 'put',
		data
	})
}
export function deletemanager(data?: object) {
	// 删除
	return request({
		url: 'admin/DeleteManager',
		method: 'delete',
		data
	})
}
