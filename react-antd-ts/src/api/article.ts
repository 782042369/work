/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: article
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-24 11:33:11
 */

import request from '../tool/request'

export function articlelist(data?: any) {
	// 列表
	return request({
		url: 'admin/articlelist',
		method: 'post',
		data
	})
}

export function addarticle(data?: any) {
	// 增加
	return request({
		url: 'admin/Addarticle',
		method: 'post',
		data
	})
}
export function editarticle(data?: any) {
	// 修改
	return request({
		url: 'admin/editarticle',
		method: 'put',
		data
	})
}
export function deletearticle(data?: any) {
	// 删除
	return request({
		url: 'admin/Deletearticle',
		method: 'delete',
		data
	})
}
export function auth(data?: any) {
	// 授权
	return request({
		url: 'admin/auth',
		method: 'post',
		data
	})
}

export function authlist(params?: any) {
	// 授权
	return request({
		url: 'admin/authlist',
		method: 'get',
		params
	})
}
