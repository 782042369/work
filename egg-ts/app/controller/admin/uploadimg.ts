import BaseController from './base';

export default class FocusController extends BaseController {
	public async uploadimg() {
		try {
			const result = await this.service.uploadimg.uploadimg();
			this.success(1, '图片上传成功', result);
		} catch (error) {
			this.error(0, '管图片上传失败', error);
		}
	}
}
