import BaseController from './base';

export default class FocusController extends BaseController {
	public async getsetting() {
		try {
			const result = await this.service.setting.getsetting();
			this.success(1, '设置读取成功', result);
		} catch (error) {
			this.error(0, '设置读取是不', error);
		}
	}
	public async editsetting() {
		try {
			const result = await this.service.setting.editsetting();
			this.success(1, '设置修改成功', result);
		} catch (error) {
			this.error(0, '设置修改失败', error);
		}
	}
}
