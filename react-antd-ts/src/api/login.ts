/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-06-03 19:40:22
 */

import request from '../tool/request'

export function dologin(data?: any) {
	// 登录接口
	return request({
		url: 'dologin',
		method: 'post',
		data
	})
}
export function loginout(data?: any) {
	// 登出接口
	return request({
		url: 'loginout',
		method: 'get',
		data
	})
}
