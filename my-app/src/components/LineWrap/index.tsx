import * as React from 'react'
import { Tooltip } from 'antd'
import './index.scss'
interface Props {
	title: string
	lineClampNum: number
}
export default class LineWrap extends React.PureComponent<Props> {
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
