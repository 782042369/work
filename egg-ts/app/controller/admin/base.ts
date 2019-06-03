import { Controller } from 'egg';
export default class BaseController extends Controller {
	/**
   *
   * @param {*} status 状态码
   * @param {*} message 提示信息
   * @param {*} data 数据
   */
	public async success(status: number, message: string, data: any = []) {
		this.ctx.body = {
			status,
			data,
			message,
		};
	}
	/**
   *
   * @param {*} status 状态码
   * @param {*} message 提示信息
   * @param {*} data 数据
   */
	public async error(status: number, message: string, data: any = []) {
		console.log('——————————————出错了——————————————');
		console.log('error', data);
		console.log('——————————————出错了——————————————');
		this.ctx.status = 200;
		this.ctx.body = {
			status,
			data,
			message,
		};
	}
	public async code() {
		/**
     * 验证码
     */
		const captcha: any = await this.service.tools.captcha();
		this.ctx.response.type = 'image/svg+xml'; // 指定返回类型
		this.ctx.body = captcha.data; // 返回验证码
	}
}
