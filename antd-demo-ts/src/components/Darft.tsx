import * as React from 'react'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import { EditorState, convertToRaw } from 'draft-js'
// import draftToHtml from 'draftjs-to-html'
interface IProps {
	editorState: any
}
interface IState {
	editorState: any
}
class index extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			// editorState: EditorState.createEmpty()
			editorState: ''
		}
	}
	// onEditorStateChange = (editorState: any) => {
	// 	this.props.editorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	// 	this.setState({
	// 		editorState
	// 	})
	// }
	render() {
		const { editorState } = this.state
		return (
			<Editor
				editorState={editorState}
				localization={{ locale: 'zh' }}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				// onEditorStateChange={this.onEditorStateChange}
			/>
		)
	}
}
export default index
