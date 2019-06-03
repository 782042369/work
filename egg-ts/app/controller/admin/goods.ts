import BaseController from './base';

export default class GoodsController extends BaseController {
	public async index() {
		try {
			const result = await this.service.goods.find();
			this.success(1, '商品列表读取成功', result);
		} catch (error) {
			this.error(0, '商品列表读取失败', error);
		}
	}
	public async addgoods() {
		try {
			const result = await this.service.goods.addgoods();
			if (result.length > 0) {
				this.success(0, '商品已经存在', result);
			} else {
				this.success(1, '增加商品成功', result);
			}
		} catch (error) {
			this.error(0, '商品增加失败', error);
		}
	}
	public async editgoods() {
		try {
			const result = await this.service.goods.editgoods();
			this.success(1, '商品修改成功', result);
		} catch (error) {
			this.error(0, '商品修改失败', error);
		}
	}
	public async deletegoods() {
		try {
			const result = await this.service.goods.deletegoods();
			this.success(1, '商品删除成功', result);
		} catch (error) {
			this.error(0, '商品删除失败', error);
		}
	}
	public async deletegoodsphotolist() {
		try {
			const result = await this.service.goods.deletegoodsphotolist();
			this.success(1, '图片删除成功', result);
		} catch (error) {
			this.error(0, '图片删除失败', error);
		}
	}
	public async editgoodsphotocolor() {
		try {
			const result = await this.service.goods.editgoodsphotocolor();
			this.success(1, '图片颜色绑定成功', result);
		} catch (error) {
			this.error(0, '图片颜色绑定成功失败', error);
		}
	}
}
