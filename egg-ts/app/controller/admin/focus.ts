import BaseController from './base';

export default class FocusController extends BaseController {
	public async bannerlist() {
		try {
			const result = await this.service.focus.find();
			this.success(1, '图片列表读取成功', result);
		} catch (error) {
			this.error(0, '图片列表读取失败', error);
		}
	}
	public async addbanner() {
		try {
			const result = await this.service.focus.addbanner();
			this.success(1, '增加banner成功', result);
		} catch (error) {
			this.error(0, '增加banner失败', error);
		}
	}
	public async editbanner() {
		try {
			const result = await this.service.focus.editbanner();
			this.success(1, '修改banner成功', result);
		} catch (error) {
			this.error(0, '修改banner失败', error);
		}
	}

	public async deletebanner() {
		try {
			const result = await this.service.focus.deletebanner();
			this.success(1, '删除banner成功', result);
		} catch (error) {
			this.error(0, '删除banner失败', error);
		}
	}
}
