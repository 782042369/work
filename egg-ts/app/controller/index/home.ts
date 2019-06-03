import { Controller } from 'egg'

export default class HomeController extends Controller {
	async index() {
		const { ctx } = this
		console.log('ctx: ', ctx)
		ctx.body = {
			msg: '欢迎欢迎'
		}
	}
}
