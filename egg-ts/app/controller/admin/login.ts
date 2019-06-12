import BaseController from './base'

export default class LoginController extends BaseController {
	public async index() {
		try {
			const code = this.ctx.request.body.code
			console.log('code: ', code)
			console.log('this.ctx.session.code: ', this.ctx.session.code)
			if (code === this.ctx.session.code) {
				const result: any = await this.service.user.finduser()
				if (result.length > 0) {
					this.ctx.session.maxAge = 1800000
					this.ctx.session.userinfo = result[0].userName
					this.success(1, '登录成功', {
						userName: result[0].userName,
						role_id: result[0].role_id
					})
				} else {
					this.error(0, '用户名或密码错误', result)
				}
			} else {
				this.error(0, '验证码错误')
			}
		} catch (error) {
			this.error(0, '登录操作错误', error)
		}
	}
	public async loginout() {
		try {
			this.ctx.session.userinfo = null
			this.success(1, '退出成功')
		} catch (error) {
			this.error(0, '退出操作失败', error)
		}
	}
}
