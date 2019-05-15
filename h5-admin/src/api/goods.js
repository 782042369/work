/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-15 16:24:52
 */

import request from '../tool/request'
/**
 * 
 * @param {*} data 商品类型
 */
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
/**
 * 
 * @param {*} data 商品属性
 */
export function goodstypeattributelist(data) {
	// 列表
	return request({
		url: 'admin/goodstypeattributelist',
		method: 'post',
		data
	})
}

export function deletegoodstypeattribute(data) {
	// 删除
	return request({
		url: 'admin/deletegoodstypeattribute',
		method: 'delete',
		data
	})
}
export function addgoodsattribute(data) {
	// 增加
	return request({
		url: 'admin/addgoodsattribute',
		method: 'post',
		data
	})
}

export function editgoodsattribute(data) {
	// 修改
	return request({
		url: 'admin/editgoodsattribute',
		method: 'put',
		data
	})
}
