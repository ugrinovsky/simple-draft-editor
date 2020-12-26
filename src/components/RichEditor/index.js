import React from 'react';
import {Editor, EditorState, RichUtils, CompositeDecorator, Modifier} from 'draft-js';

import './styles.css';

import constants from '../../constants';

import linkDecorator from '../../decorators/Link';

import Toolbar from '../Toolbar';

import {handleDraftEditorPastedText} from "draftjs-conductor";

import {styleMap} from '../Toolbar/buttons';

class RichEditor extends React.Component {
    constructor(props) {
        super(props);

        const compositeDecorator = this.getCompositeDecorator();
        this.state = {
            editorState: EditorState.createEmpty(compositeDecorator)
        };
        this.updateState = editorState => this.setState({ editorState });
    }

    updateState = (editorState) => {
        this.setState({editorState});
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.updateState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    createLinkEntity = (createEntity, url) => {
        return createEntity(
            'LINK',
            'MUTABLE',
            { url }
        );
    }

    applyLinkToSelection = (editorState, url) => {
        const contentState = editorState.getCurrentContent();

        let newContentState = this.createLinkEntity(contentState.createEntity.bind(contentState), url);
        const entityKey = newContentState.getLastCreatedEntityKey();
        newContentState = Modifier.applyEntity(newContentState, editorState.getSelection(), entityKey);

        let newEditorState = EditorState.push(
            editorState,
            newContentState,
            "apply-entity"
        );

        return newEditorState;
    }

    createLinkedText = (editorState, url, text) => {
        const contentState = editorState.getCurrentContent();

        let newContentState = this.createLinkEntity(contentState.createEntity.bind(contentState), url);
        const entityKey = newContentState.getLastCreatedEntityKey();
        newContentState = Modifier.insertText(newContentState, editorState.getSelection(), text, null, entityKey);

        let newEditorState = EditorState.push(
            editorState,
            newContentState,
            "insert-characters"
        );

        let newSelection = newContentState.getSelectionAfter();
        newEditorState = EditorState.forceSelection(newEditorState, newSelection);

        return newEditorState;
    }

    handlePastedText = (text, html) => {
        const editorState = this.state.editorState;
        if (constants.URL_REGEX.test(text)) {
            const url = text;
            let newEditorState;

            if (editorState.getSelection().isCollapsed()) {
                newEditorState = this.createLinkedText(editorState, url, url);
            } else {
                newEditorState = this.applyLinkToSelection(editorState, url);
            }

            this.updateState(newEditorState);
            return true;
        }

        let newState = handleDraftEditorPastedText(html, editorState);

        if (newState) {
            this.updateState(newState);
            return true;
        }

        return false;
    }

    getCompositeDecorator = toolbar => {
        const decorators = [
            linkDecorator()
        ];
        return new CompositeDecorator(decorators);
    };

    render () {
        return (
            <div>
                <Toolbar
                    updateStateCallback={this.updateState}
                    editorState={this.state.editorState} />
                <div className="editor">
                    <Editor
                        handlePastedText={this.handlePastedText}
                        customStyleMap={styleMap}
                        handleKeyCommand={this.handleKeyCommand}
                        editorState={this.state.editorState}
                        onChange={this.updateState} />
                </div>
            </div>
        );
    }
}

export default RichEditor;
