import { Controller } from 'egg'
export default class HomeController extends Controller {
	async index() {
		const { ctx } = this
		ctx.body = '欢迎欢迎'
	}
}
