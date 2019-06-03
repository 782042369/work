import { Service } from 'egg';

export default class NavService extends Service {
	// 查找
	async find() {
		const pagesize = this.ctx.request.body.pagesize || 10;
		const pagenum = this.ctx.request.body.pagenum || 1;
		const result: any = await this.ctx.model.Nav
			.find(this.ctx.request.body)
			.sort({
				add_time: -1,
			})
			.skip((pagenum - 1) * pagesize)
			.limit(pagesize);
		return result;
	}
	// 增加
	async addnav() {
		const title = this.ctx.request.body.title;
		let result: any = '';
		result = await this.ctx.model.Nav.find({
			title,
		});
		if (result.length === 0) {
			const nav = new this.ctx.model.Nav(this.ctx.request.body);
			result = nav.save();
		}
		return result;
	}
	// 编辑
	async edit() {
		const _id = this.ctx.request.body.id;
		const result: any = await this.ctx.model.Nav.updateOne(
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
		const result: any = await this.ctx.model.Nav.deleteOne({
			_id,
		});
		return result;
	}
}

module.exports = NavService;
