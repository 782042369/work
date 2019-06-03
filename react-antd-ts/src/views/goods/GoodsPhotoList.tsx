import * as React from 'react'

import { goodslist, deletegoodsphotolist, editgoodsphotocolor } from '../../api/goods'
//  editgoodsphonelist
import getUrlParam from '../../tool/getUrlParam'
import { message, Button } from 'antd'
import From from '../../components/Form'
interface IProps {}
interface IState {
	optionlist: any
	h1title: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			optionlist: '',
			h1title: ''
		}
	}
	handleSubmit = (values: any) => {
		editgoodsphotocolor({ values })
			.then((res: any) => {
				message.success(res.message)
			})
			.catch((err: any) => {
				message.error(err.message)
				console.log(err)
			})
	}
	deletegoodsphotolist(_id: any) {
		deletegoodsphotolist({ _id })
			.then((res: any) => {
				message.success(res.message)
				this.getgoodsphoto()
			})
			.catch((err: any) => {
				message.error(err.message)
				this.getgoodsphoto()
				console.log(err)
			})
	}
	getgoodsphoto() {
		goodslist({
			_id: getUrlParam('id')
		})
			.then((res: any) => {
				let color: any = []
				res.data.goods_color.forEach((element: any, index: any) => {
					color.push({
						label: element.color_name,
						value: element._id
					})
				})
				let arr: any = []
				res.data.photoList.forEach((element: any, index: any) => {
					arr.push({
						type: 'imgselect',
						lable: `相册${index + 1}`,
						setValue: element.color_id,
						placeholder: '请输入',
						field: element['_id'],
						imgpath: `http://127.0.0.1:7001${element.img_url}`,
						list: color,
						render: () => (
							<Button
								style={{ marginLeft: '2vw' }}
								htmlType="submit"
								onClick={this.deletegoodsphotolist.bind(this, element['_id'])}
								type="primary"
							>
								删除
							</Button>
						)
					})
				})
				this.setState({
					optionlist: arr,
					h1title: '修改商品相册颜色绑定'
				})
			})
			.catch((err: any) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getgoodsphoto()
	}
	handlephontChange = (info: any) => {}
	render() {
		return <From formList={this.state.optionlist} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default index
