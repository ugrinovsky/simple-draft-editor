import React from 'react';
import './styles.css';

class MarkButton extends React.Component {
    constructor(props) {
        super(props);
    }

    isMarkActive = (editorState, format) => {
        return editorState.getCurrentInlineStyle().has(format);
    }

    render() {
        return (
            <div
                className={`toolbarButton ${this.isMarkActive(this.props.editorState, this.props.format) ? 'toolbarButtonActive' : ''}`}
                onMouseDown={event => {
                    event.preventDefault()
                    this.props.handler(this.props.editorState, this.props.format)
                }}
            >
                {this.props.title}
            </div>
        )
    }
}

export default MarkButton;
