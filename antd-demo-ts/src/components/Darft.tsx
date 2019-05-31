import * as React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from '../tool/draftToHtml'
import htmlToDraft from 'html-to-draftjs';
interface IProps {
	editorState: any
	val: any
}
interface IState {
	editorState: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			editorState: EditorState.createEmpty()
		}
	}
	componentWillReceiveProps(nextProps:any) {
		if (this.props.val !== nextProps.getSysResult && nextProps.getSysResult.data) {
			// 匹配富文本编辑器格式，回显保存的内容
			const contentBlock = htmlToDraft(nextProps.getSysResult.data.roomnotes)
			if (contentBlock) {
				const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
				const editorState = EditorState.createWithContent(contentState)
				this.setState({ editorState })
			}
		}
	}
	onEditorStateChange = (editorState: any) => {
		this.props.editorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
		this.setState({
			editorState
		})
	}
	render() {
		const { editorState } = this.state
		return (
			<Editor
				editorState={editorState}
				localization={{ locale: 'zh' }}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={this.onEditorStateChange}
			/>
		)
	}
}
export default index
