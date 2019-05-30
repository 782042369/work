/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: role
 * @Date: 2019-05-05 17:09:31
 * @LastEditTime: 2019-05-06 12:41:01
 */

import request from '../tool/request'

export function dologin(data?: object) {
	// 登录接口
	return request({
		url: 'dologin',
		method: 'post',
		data
	})
}
