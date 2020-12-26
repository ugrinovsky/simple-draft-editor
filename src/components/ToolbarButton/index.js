import React from 'react';
import './styles.css';

class ToolbarButton extends React.Component {
    isButtonActive = (editorState, format) => {
        return editorState.getCurrentInlineStyle().has(format);
    }

    render() {
        const isButtonActive = this.isButtonActive(this.props.editorState, this.props.format);
        return (
            <div
                className={`toolbarButton ${isButtonActive ? 'toolbarButtonActive' : ''}`}
                onMouseDown={event => {
                    event.preventDefault();
                    this.props.handler(
                        this.props.editorState,
                        this.props.updateStateCallback,
                        this.props.format
                    );
                }}
            >
                {this.props.title}
            </div>
        )
    }
}

export default ToolbarButton;
