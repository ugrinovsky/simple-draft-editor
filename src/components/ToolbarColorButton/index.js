import React from 'react';
import ColorPanel from "../ColorPanel";

class ToolbarColorButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isActive: false};
    }

    onMouseDownHandler = (value) => {
        this.setState({isActive: value});
    }

    updateActiveColor = (color) => {
        this.props.handler(
            this.props.editorState,
            this.props.updateStateCallback,
            this.props.format + '_' + color
        );
        this.onMouseDownHandler(false);
    }

    render() {
        return (
            <div
                onMouseEnter={() => this.onMouseDownHandler(true)}
                onMouseLeave={() => this.onMouseDownHandler(false)}
                className={`toolbarButton ${this.state.isActive ? 'toolbarButtonActive' : ''}`}>
                {this.props.title}

                {this.state.isActive && <ColorPanel
                    updateActiveColor={this.updateActiveColor}
                />}
            </div>
        )
    }
}

export default ToolbarColorButton;
