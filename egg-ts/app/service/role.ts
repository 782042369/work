'use strict'
const Service = require('egg').Service
export default class RoleService extends Service {
	// 查找
	async find() {
		const pagesize = this.ctx.request.body.pagesize || 10
		const pagenum = this.ctx.request.body.pagenum || 1
		const result: any = await this.ctx.model.Role
			.find(this.ctx.request.body)
			.sort({
				add_time: -1
			})
			.skip((pagenum - 1) * pagesize)
			.limit(pagesize)
		return result
	}
	// 增加
	async addrole() {
		const title = this.ctx.request.body.title
		let result: any = ''
		result = await this.ctx.model.Role.find({
			title
		})
		if (result.length === 0) {
			const role = new this.ctx.model.Role(this.ctx.request.body)
			result = role.save()
		}
		return result
	}
	// 编辑
	async edit() {
		const _id = this.ctx.request.body.id
		const result: any = await this.ctx.model.Role.updateOne(
			{
				_id
			},
			Object.assign(this.ctx.request.body, {
				add_time: new Date().getTime()
			})
		)
		return result
	}
	// 删除
	async delete() {
		const _id = this.ctx.request.body.id
		const result: any = await this.ctx.model.Role.deleteOne({
			_id
		})
		return result
	}

	// 关联权限
	async addauth() {
		const { access_node, role_id } = this.ctx.request.body
		try {
			await this.ctx.model.Addauth.deleteMany({
				role_id
			})
			access_node.forEach((res) => {
				if (res.checkedList.length > 0) {
					res.checkedList.forEach((element) => {
						this.ctx.model.Access
							.find({
								_id: element
							})
							.then((val) => {
								const { module_name, sort, url } = val[0]
								const auth = new this.ctx.model.Addauth({
									role_id,
									pid: this.app.mongoose.Types.ObjectId(res.key),
									access_id: this.app.mongoose.Types.ObjectId(element),
									sort,
									module_name,
									url
								})
								auth.save()
							})
					})
					this.ctx.model.Access
						.find({
							_id: res.key
						})
						.then((ele) => {
							const { module_name, _id, sort, url } = ele[0]
							const authparent = new this.ctx.model.Addauth({
								role_id,
								module_name,
								sort,
								parent_id: _id,
								url
							})
							authparent.save()
						})
				}
			})
		} catch (error) {
			console.log('error: ', error)
			return error
		}
	}
	// 查询关联权限
	async authlist() {
		const { role_id } = this.ctx.request.query
		const result: any = await this.ctx.model.Addauth
			.find({
				role_id
			})
			.sort({
				sort: -1
			})
		return result
	}
}

module.exports = RoleService
