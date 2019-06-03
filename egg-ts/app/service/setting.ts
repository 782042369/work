import { Service } from 'egg';
export default class UploadimgService extends Service {
	async getsetting() {
		try {
			const result: any = this.ctx.model.Setting.find({});
			return result;
		} catch (error) {
			console.log('error: ', error);
			return error;
		}
	}
	async editsetting() {
		try {
			const { _id, site_logo } = this.ctx.request.body;
			let result: any = [];
			if (_id) {
				if (site_logo.file) {
					this.ctx.request.body.site_logo = site_logo.file.response.data[0].saveDir;
				} else {
					this.ctx.request.body.site_logo = site_logo;
				}
				result = await this.ctx.model.Setting.updateOne(
					{
						_id,
					},
					{
						...this.ctx.request.body,
					},
				);
			} else {
				const setting = new this.ctx.model.Setting(this.ctx.request.body);
				result = await setting.save();
			}
			return result;
		} catch (error) {
			console.log('error: ', error);
			return error;
		}
	}
}

module.exports = UploadimgService;
