import { Service } from 'egg';
export default class GoodsColorService extends Service {
	async find() {
		try {
			const pagesize = this.ctx.request.body.pagesize || 10;
			const pagenum = this.ctx.request.body.pagenum || 1;
			const result: any = await this.ctx.model.GoodsColor
				.find(this.ctx.request.body)
				.sort({
					add_time: -1,
				})
				.skip((pagenum - 1) * pagesize)
				.limit(pagesize);
			return result;
		} catch (error) {
			console.log('error: ', error);
			return error;
		}
	}
	// 增加
	async addgoodscolor() {
		const { color_name } = this.ctx.request.body;
		let result: any = '';
		result = await this.ctx.model.GoodsColor.find({
			color_name,
		});
		if (result.length === 0) {
			const goods = new this.ctx.model.GoodsColor(this.ctx.request.body);
			result = goods.save();
		}
		return result;
	}
	// 编辑
	async editgoodscolor() {
		try {
			const { _id } = this.ctx.request.body;
			const result: any = await this.ctx.model.GoodsColor.updateOne(
				{
					_id,
				},
				Object.assign(this.ctx.request.body, {
					add_time: new Date().getTime(),
				}),
			);
			return result;
		} catch (error) {
			console.log('error: ', error);
			return error;
		}
	}
	async deletegoodscolor() {
		const _id = this.ctx.request.body.id;
		const result: any = await this.ctx.model.GoodsColor.deleteOne({
			_id,
		});
		return result;
	}
}

module.exports = GoodsColorService;
