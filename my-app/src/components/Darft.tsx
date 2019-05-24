import { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
class Darft extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty()
		};
	}
	onEditorStateChange = (editorState) => {
		this.props.editorState(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		this.setState({
			editorState
		});
	}
	render() {
		const { editorState } = this.state;
		return (
			<Editor
				editorState={editorState}
				localization={{ locale: 'zh' }}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={this.onEditorStateChange}
			/>
		);
	}
}
export default Darft;
