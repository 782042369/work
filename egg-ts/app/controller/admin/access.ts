/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-06-03 18:47:58
 */

import BaseController from './base'

export default class AccessController extends BaseController {
	public async index() {
		try {
			const result = await this.service.access.find()
			this.success(1, '权限列表请求成功', result)
		} catch (error) {
			this.error(0, '权限列表请求失败', error)
		}
	}
	public async add() {
		try {
			const result = await this.service.access.addaccess()
			if (result.length > 0) {
				this.success(0, '权限已经存在', result)
			} else {
				this.success(1, '增加权限成功', result)
			}
		} catch (error) {
			this.error(0, '增加权限失败', error)
		}
	}
	public async findaccesslist() {
		try {
			const result = await this.service.access.findaccesslist()
			this.success(1, '查询权限菜单成功', result)
		} catch (error) {
			this.error(0, '查询权限菜单失败', error)
		}
	}
	public async edit() {
		try {
			const result = await this.service.access.edit()
			this.success(1, '修改权限成功', result)
		} catch (error) {
			this.error(0, '修改权限失败', error)
		}
	}
	public async delete() {
		try {
			const result = await this.service.access.delete()
			this.success(1, '删除权限成功', result)
		} catch (error) {
			this.error(0, '删除权限失败', error)
		}
	}
}
