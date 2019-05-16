'use strict'

const BaseController = require('./base')

class GoodsController extends BaseController {
	async index() {
		try {
			const result = await this.service.goodsCate.find()
			const data = await this.sortdata(result, 'sort');
			this.success(1, '商品分类列表读取成功', data)
		} catch (error) {
			this.error(0, '商品分类列表读取失败', error)
		}
	}
	async addgoodscate() {
		try {
			const result = await this.service.goodsCate.addgoodsattribute()
			if (result.length > 0) {
				this.success(0, '商品分类已经存在', result)
			} else {
				this.success(1, '增加商品分类成功', result)
			}
		} catch (error) {
			this.error(0, '商品分类增加失败', error)
		}
	}
	async editgoodscate() {
		try {
			const result = await this.service.goodsCate.editgoodsattribute()
			this.success(1, '商品分类修改成功', result)
		} catch (error) {
			this.error(0, '商品分类修改失败', error)
		}
	}
	async deletegoodscate() {
		try {
			const result = await this.service.goodsCate.deletegoodsattribute()
			this.success(1, '商品分类删除成功', result)
		} catch (error) {
			this.error(0, '商品分类删除失败', error)
		}
	}
}

module.exports = GoodsController
