import React from 'react';
import {EditorState, RichUtils} from "draft-js";

import ToolbarButton from '../ToolbarButton';

export const toolbarStyleMap = {
    CODE: {
        backgroundColor: '#ccc',
        padding: '3px',
        borderRadius: '3px',
        fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace'
    }
}

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    customStyleHandler = (editorState, style) => {
        const selection = editorState.getSelection();

        // новое состояние
        let nextEditorState = EditorState.push(
            editorState,
            editorState.getCurrentContent(),
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        // если текст не выделен, включим или отключим формат
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, style) => {
                return RichUtils.toggleInlineStyle(state, style);
            }, nextEditorState);
        }

        // применим формат
        if (!currentStyle.has(style)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                style
            );
        }

        this.props.updateState(nextEditorState);
    }

    simpleStyleHandler = (editorState, format) => {
        this.props.updateState(RichUtils.toggleInlineStyle(editorState, format));
    }

    render() {
        return (
            <div className="toolbar">
                <ToolbarButton
                    title="Код"
                    format="CODE"
                    editorState={this.props.editorState}
                    handler={this.customStyleHandler} />
                <ToolbarButton
                    title="Жирный"
                    format="BOLD"
                    editorState={this.props.editorState}
                    handler={this.simpleStyleHandler} />
            </div>
        );
    }
}

export default Toolbar;
