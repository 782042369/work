/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-21 15:06:02
 */

import BaseController from './base';

export default class ManagerController extends BaseController {
	public async index() {
		try {
			const result = await this.service.manager.find();
			this.success(1, '管理员列表请求成功', result);
		} catch (error) {
			this.error(0, '管理员列表请求失败', error);
		}
	}
	public async add() {
		try {
			const result = await this.service.manager.addmanager();
			if (result.length > 0) {
				this.error(0, '管理员已经存在', result);
			} else {
				this.success(1, '增加管理员成功', result);
			}
		} catch (error) {
			this.error(0, '增加管理员失败', error);
		}
	}
	public async edit() {
		try {
			const result = await this.service.manager.edit();
			this.success(1, '修改管理员成功', result);
		} catch (error) {
			this.error(0, '修改管理员失败', error);
		}
	}
	public async delete() {
		try {
			const result = await this.service.manager.delete();
			this.success(1, '删除管理员成功', result);
		} catch (error) {
			this.error(0, '删除管理员失败', error);
		}
	}
}
