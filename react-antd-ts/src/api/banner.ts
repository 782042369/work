/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 轮播图
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-28 16:36:17
 */
import request from '../tool/request'

export function addbanner(data?: any) {
	// 增加banner
	return request({
		url: 'admin/addbanner',
		method: 'post',
		data
	})
}
export function editbanner(data?: any) {
	// 修改banner
	return request({
		url: 'admin/editbanner',
		method: 'put',
		data
	})
}

export function bannerlist(data?: any) {
	// 修改banner
	return request({
		url: 'admin/bannerlist',
		method: 'post',
		data
	})
}

export function deletebanner(data?: any) {
	// 修改banner
	return request({
		url: 'admin/deletebanner',
		method: 'delete',
		data
	})
}
