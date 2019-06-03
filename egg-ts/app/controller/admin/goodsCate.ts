import BaseController from './base';

export default class GoodsController extends BaseController {
	public async index() {
		try {
			const result = await this.service.goodsCate.find();
			this.success(1, '商品分类列表读取成功', result);
		} catch (error) {
			this.error(0, '商品分类列表读取失败', error);
		}
	}
	public async addgoodscate() {
		try {
			const result = await this.service.goodsCate.addgoodscate();
			if (result.length > 0) {
				this.success(0, '商品分类已经存在', result);
			} else {
				this.success(1, '增加商品分类成功', result);
			}
		} catch (error) {
			this.error(0, '商品分类增加失败', error);
		}
	}
	public async editgoodscate() {
		try {
			const result = await this.service.goodsCate.editgoodscate();
			this.success(1, '商品分类修改成功', result);
		} catch (error) {
			this.error(0, '商品分类修改失败', error);
		}
	}
	public async deletegoodscate() {
		try {
			const result = await this.service.goodsCate.deletegoodscate();
			this.success(1, '商品分类删除成功', result);
		} catch (error) {
			this.error(0, '商品分类删除失败', error);
		}
	}
}
