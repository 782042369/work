import { Service } from 'egg'
const svgCaptcha = require('svg-captcha')
const path = require('path')
const mkdirp = require('mkdirp')
const Jimp = require('jimp')
const sd = require('silly-datetime')
export default class ToolsService extends Service {
	async captcha() {
		const captcha = svgCaptcha.create({
			size: 4, // size of random string
			fontSize: 50, // size of random string
			width: 100,
			height: 40,
			background: '#cc9966' // background color of the svg images
		})
		console.log('this.ctx.session.code: ', this.ctx.session.code)
		this.ctx.session.code = captcha.text.toLowerCase() // 验证码信息
		this.ctx.session.maxAge = 60000
		return captcha
	}
	// 数组扁平化
	async steamroller(arr) {
		while (arr.some((item) => Array.isArray(item))) {
			arr = [].concat(...arr)
		}
		return arr
	}
	// 图片上传
	async getuploadfile(filename) {
		try {
			const day = sd.format(new Date(), 'YYYYMMDD')
			const dir = path.join(this.config.uploadfile, day)
			await mkdirp(dir)
			const uploadDir = path.join(dir, new Date().getTime() + path.extname(filename))
			return {
				uploadDir,
				saveDir: uploadDir.slice(3).replace(/\\/g, '/')
			}
		} catch (error) {
			console.log('error: ', error)
			return error
		}
	}
	// 缩略图
	async jimp(uploadDir, size) {
		Jimp.read(uploadDir)
			.then((lenna) => {
				return lenna
					.resize(size, size) // resize
					.quality(80) // set JPEG quality
					.write(`${uploadDir}_${size}x${size}${path.extname(uploadDir)}`) // save
			})
			.catch((err) => {
				console.error(err)
				return err
			})
	}
}

module.exports = ToolsService
