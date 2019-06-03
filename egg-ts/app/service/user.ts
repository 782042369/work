import { Service } from 'egg';

export default class UserService extends Service {
	async finduser() {
		const password = this.ctx.request.body.password;
		const userName = this.ctx.request.body.userName;
		const result: any = await this.ctx.model.User.find({
			userName,
			password,
		});
		return result;
	}
}

module.exports = UserService;
