import * as React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import draftToHtml from '../tool/draftToHtml'
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
	componentDidMount() {
		const html = 'testing this will work'
		const contentBlock: any = convertFromHTML(html)
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(contentBlock)
			const editorState = EditorState.createWithContent(contentState)
			this.state = {
				editorState
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
