import * as React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import { EditorState, convertToRaw } from 'draft-js'
import { EditorState } from 'draft-js'
// import draftToHtml from 'draftjs-to-html'
class Darft extends React.Component {
	/**
	 * name
	 */
	public state = {
		editorState: EditorState.createEmpty()
	}
	// onEditorStateChange = (editorState: any) => {
	// 	this.props.editorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	// 	this.setState({
	// 		editorState
	// 	})
	// }
	render() {
		return (
			<Editor
				editorState={this.state.editorState}
				localization={{ locale: 'zh' }}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				// onEditorStateChange={this.onEditorStateChange}
			/>
		)
	}
}
export default Darft
