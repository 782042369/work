import { Service } from 'egg'

export default class GoodsService extends Service {
	async find() {
		try {
			const { _id } = this.ctx.request.body
			if (_id) {
				const goods = await this.ctx.model.Goods.find({
					_id
				})
				const photoList = await this.ctx.model.GoodsImage.find({
					goods_id: _id
				})
				const selecttypeoptions = await this.ctx.model.GoodsAttr.find({
					goods_id: _id
				})
				const colorArrTemp = goods[0].goods_color.split(',')
				const goodsColorArr: any = []
				colorArrTemp.forEach((value) => {
					goodsColorArr.push({
						_id: value
					})
				})
				const goodsColorReulst = await this.ctx.model.GoodsColor.find({
					$or: goodsColorArr
				})
				return {
					goods: goods[0],
					photoList,
					selecttypeoptions,
					goods_color: goodsColorReulst
				}
			}
			const pagesize = this.ctx.request.body.pagesize || 10
			const pagenum = this.ctx.request.body.pagenum || 1
			const result: any = await this.ctx.model.Goods
				.find(this.ctx.request.body)
				.sort({
					add_time: -1
				})
				.skip((pagenum - 1) * pagesize)
				.limit(pagesize)
			return result
		} catch (error) {
			console.log('error: ', error)
			return error
		}
	}
	// 增加商品
	async addgoods() {
		const {
			title,
			goods_color,
			goods_type_id,
			goods_img,
			cate_id,
			selecttypeoptions,
			shop_price,
			market_price,
			photoList
		} = this.ctx.request.body
		const link = goods_img.file.response.data[0].saveDir // 商品主图
		this.ctx.request.body.shop_price = Number(shop_price)
		this.ctx.request.body.market_price = Number(market_price)
		this.ctx.request.body.goods_color = goods_color.join(',')
		this.ctx.request.body.goods_img = link
		this.ctx.request.body.goods_type_id = this.app.mongoose.Types.ObjectId(goods_type_id)
		let result: any = ''
		result = await this.ctx.model.Goods.find({
			title
		})
		if (result.length === 0) {
			const goods = new this.ctx.model.Goods(this.ctx.request.body)
			result = await goods.save()
			if (result._id) {
				const goods_id = this.app.mongoose.Types.ObjectId(result._id)
				this.savegoodsimg(photoList, goods_id) // 商品相册存储
				selecttypeoptions && this.findattribute(selecttypeoptions, cate_id, goods_id) // 商品属性存储
			}
		}
		return result
	}
	// 商品相册
	async savegoodsimg(photoList, goods_id) {
		photoList &&
			photoList.fileList.forEach((res) => {
				const img_url = res.response.data[0].saveDir
				const goodsimglist = new this.ctx.model.GoodsImage({
					img_url,
					goods_id
				})
				goodsimglist.save()
			})
	}
	async findattribute(selecttypeoptions, cate_id, goods_id, update?: any) {
		for (const i in selecttypeoptions) {
			const res = selecttypeoptions[i]
			if (typeof res.value === 'object') {
				res.value = res.value.join('')
			}
			if (update) {
				await this.ctx.model.GoodsAttr.updateOne(
					{
						attribute_id: res.key
					},
					{
						attribute_value: res.value,
						add_time: new Date().getTime()
					}
				)
			} else {
				const attributeresult = await this.ctx.model.GoodsTypeAttribute.find({
					_id: res.key
				})
				const goodsattr = new this.ctx.model.GoodsAttr({
					goods_id,
					cate_id,
					attribute_id: res.key,
					attribute_type: attributeresult[0].attr_type,
					attribute_title: attributeresult[0].title,
					attribute_value: res.value
				})
				await goodsattr.save()
			}
		}
	}
	// 编辑
	async editgoods() {
		try {
			const {
				_id,
				goods_color,
				goods_type_id,
				goods_img,
				cate_id,
				market_price,
				shop_price,
				selecttypeoptions,
				photoList
			} = this.ctx.request.body
			this.ctx.request.body.goods_color = goods_color.join(',')
			let link = ''
			if (goods_img.file) {
				link = goods_img.file.response.data[0].saveDir // 商品主图
			} else {
				link = goods_img // 商品主图
			}
			this.ctx.request.body.goods_img = link
			this.ctx.request.body.shop_price = Number(shop_price)
			this.ctx.request.body.market_price = Number(market_price)
			this.ctx.request.body.goods_type_id = this.app.mongoose.Types.ObjectId(goods_type_id)
			const result: any = await this.ctx.model.Goods.updateOne(
				{
					_id
				},
				Object.assign(this.ctx.request.body, {
					add_time: new Date().getTime()
				})
			)
			const goods_id = this.app.mongoose.Types.ObjectId(_id)
			this.savegoodsimg(photoList, goods_id) // 商品相册存储
			selecttypeoptions && this.findattribute(selecttypeoptions, cate_id, goods_id) // 商品属性存储
			return result
		} catch (error) {
			console.log('error: ', error)
			return error
		}
	}
	// 删除商品
	async deletegoods() {
		const _id = this.ctx.request.body.id
		const result: any = await this.ctx.model.Goods.deleteOne({
			_id
		})
		return result
	}
	// 删除商品
	async deletegoodsphotolist() {
		const result: any = await this.ctx.model.GoodsImage.deleteOne(this.ctx.request.body)
		return result
	}
	async editgoodsphotocolor() {
		try {
			const { values } = this.ctx.request.body
			let result: any = ''
			for (const i in values) {
				if (values[i]) {
					result = await this.ctx.model.GoodsImage.updateOne(
						{
							_id: i
						},
						{
							color_id: values[i]
						}
					)
					console.log('result: ', result)
				}
			}
			return result
		} catch (error) {
			return error
		}
	}
}

module.exports = GoodsService
