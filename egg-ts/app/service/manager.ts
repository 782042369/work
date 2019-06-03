'use strict';
const Service = require('egg').Service;
export default class ManagerService extends Service {
	// 查找
	async find() {
		const _id = this.ctx.request.body.id;
		let result: any = '';
		const pagesize = this.ctx.request.body.pagesize || 10;
		const pagenum = this.ctx.request.body.pagenum || 1;
		if (_id) {
			result = await this.ctx.model.User
				.find({
					_id,
				})
				.sort({
					add_time: -1,
				})
				.skip((pagenum - 1) * pagesize)
				.limit(pagesize);
		} else {
			result = await this.ctx.model.User.aggregate([
				{
					$lookup: {
						from: 'role',
						localField: 'role_id',
						foreignField: '_id',
						as: 'role',
					},
				},
				{
					$sort: {
						add_time: -1,
					},
				},
				{
					$skip: (pagenum - 1) * pagesize,
				},
				{
					$limit: pagesize,
				},
			]);
		}
		return result;
	}
	// 增加
	async addmanager() {
		const userName = this.ctx.request.body.userName;
		let result: any = await this.ctx.model.User.find({
			userName,
		});
		if (result.length === 0) {
			const rolearr = new this.ctx.model.User(this.ctx.request.body);
			result = rolearr.save();
		}
		return result;
	}
	// 编辑
	async edit() {
		const _id = this.ctx.request.body.id;
		const result: any = await this.ctx.model.User.updateOne(
			{
				_id,
			},
			Object.assign(this.ctx.request.body, {
				add_time: new Date().getTime(),
			}),
		);
		return result;
	}
	// 删除
	async delete() {
		const _id = this.ctx.request.body.id;
		const result: any = await this.ctx.model.User.deleteOne({
			_id,
		});
		return result;
	}
}

module.exports = ManagerService;
