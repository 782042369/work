/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-27 20:10:24
 */

import request from '../tool/request'
/**
 * 
 * @param {*} data 添加商品
 */
export function goodslist(data?: object) {
	// 列表
	return request({
		url: 'admin/goodslist',
		method: 'post',
		data
	})
}

export function deletegoods(data?: object) {
	// 删除
	return request({
		url: 'admin/deletegoods',
		method: 'delete',
		data
	})
}
export function addgoods(data?: object) {
	// 增加
	return request({
		url: 'admin/addgoods',
		method: 'post',
		data
	})
}

export function editgoods(data?: object) {
	// 修改
	return request({
		url: 'admin/editgoods',
		method: 'put',
		data
	})
}
/**
 * 
 * @param {*} data 商品类型
 */
export function goodstypelist(data?: object) {
	// 列表
	return request({
		url: 'admin/goodstypelist',
		method: 'post',
		data
	})
}

export function deletegoodstype(data?: object) {
	// 删除
	return request({
		url: 'admin/deletegoodstype',
		method: 'delete',
		data
	})
}
export function addgoodstype(data?: object) {
	// 增加
	return request({
		url: 'admin/addgoodstype',
		method: 'post',
		data
	})
}

export function editgoodstype(data?: object) {
	// 修改
	return request({
		url: 'admin/editgoodstype',
		method: 'put',
		data
	})
}
/**
 * 
 * @param {*} data 商品属性
 */
export function goodstypeattributelist(data?: object) {
	// 列表
	return request({
		url: 'admin/goodstypeattributelist',
		method: 'post',
		data
	})
}

export function deletegoodstypeattribute(data?: object) {
	// 删除
	return request({
		url: 'admin/deletegoodstypeattribute',
		method: 'delete',
		data
	})
}
export function addgoodsattribute(data?: object) {
	// 增加
	return request({
		url: 'admin/addgoodsattribute',
		method: 'post',
		data
	})
}

export function editgoodsattribute(data?: object) {
	// 修改
	return request({
		url: 'admin/editgoodsattribute',
		method: 'put',
		data
	})
}
/**
 * 
 * @param {*} data 商品分类
 */
export function goodscatelist(data?: object) {
	// 列表
	return request({
		url: 'admin/goodscatelist',
		method: 'post',
		data
	})
}

export function deletegoodscate(data?: object) {
	// 删除
	return request({
		url: 'admin/deletegoodscate',
		method: 'delete',
		data
	})
}
export function addgoodscate(data?: object) {
	// 增加
	return request({
		url: 'admin/addgoodscate',
		method: 'post',
		data
	})
}

export function editgoodscate(data?: object) {
	// 修改
	return request({
		url: 'admin/editgoodscate',
		method: 'put',
		data
	})
}

// 商品颜色
export function goodscolorlist(data?: object) {
	// 修改
	return request({
		url: 'admin/goodscolorlist',
		method: 'post',
		data
	})
}

// 商品相册删除
export function deletegoodsphotolist(data?: object) {
	return request({
		url: 'admin/deletegoodsphotolist',
		method: 'delete',
		data
	})
}

// 商品相册删除
export function editgoodsphotocolor(data?: object) {
	return request({
		url: 'admin/editgoodsphotocolor',
		method: 'put',
		data
	})
}
