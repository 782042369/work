import React, { PureComponent } from 'react'
import { Tooltip } from 'antd'
import './index.scss'
interface IProps {
	lineClampNum: number
	title: string
}
interface IState {}
export default class LineWrap extends PureComponent<IProps, IState> {
	render() {
		const { title, lineClampNum } = this.props
		return (
			<Tooltip placement="topLeft" title={title}>
				<span className="lineEllipsis" style={{ WebkitLineClamp: lineClampNum }}>
					{title}
				</span>
			</Tooltip>
		)
	}
}
