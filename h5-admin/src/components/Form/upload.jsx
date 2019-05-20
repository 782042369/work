/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-20 19:49:40
 */
import React, { Component } from 'react'
import { Upload, message, Icon } from 'antd'
const Dragger = Upload.Dragger
class upload extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const props = {
			name: 'file',
			action: '/admin/uploadimg',
			multiple: true,
			headers: {
				authorization: 'authorization-text'
			},
			onChange(info) {
				const status = info.file.status
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`)
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`)
				}
			}
		}
		return (
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<Icon type="inbox" />
				</p>
				<p className="ant-upload-text">点击上传</p>
				<p className="ant-upload-hint">请选择你需要上传的图片</p>
			</Dragger>
		)
	}
}
export default upload
