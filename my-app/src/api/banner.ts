/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 轮播图
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-14 17:47:23
 */
import request from '../tool/request'

export function addbanner(data?: object) {
	// 增加banner
	return request({
		url: 'admin/addbanner',
		method: 'post',
		data
	})
}
export function editbanner(data?: object) {
	// 修改banner
	return request({
		url: 'admin/editbanner',
		method: 'put',
		data
	})
}

export function bannerlist(data?: object) {
	// 修改banner
	return request({
		url: 'admin/bannerlist',
		method: 'post',
		data
	})
}

export function deletebanner(data?: object) {
	// 修改banner
	return request({
		url: 'admin/deletebanner',
		method: 'delete',
		data
	})
}
