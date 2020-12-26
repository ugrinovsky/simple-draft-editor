import React from 'react';

import ToolbarButton from '../ToolbarButton';
import ColorPanel from "../ColorPanel";

import {default as inlineButtons} from './buttons/inline';
import {default as complexButtons} from './buttons/complex';
import ToolbarColorButton from "../ToolbarColorButton";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {colorPanelVisible: false};

        this.buttons = [...inlineButtons, ...complexButtons];
    }

    toggleColorPanel = (editorState, format) => {
        this.setState({colorPanelVisible: !this.state.colorPanelVisible});
    }

    handleBlur = () => {
        this.setState({colorPanelVisible: false});
    }

    backgroundHandler = (color) => {
        this.customStyleHandler(this.props.editorState, color);
    }

    render() {
        return (
            <div className="toolbar">
                {this.buttons.map(button => {
                    if (button.type === 'simple') {
                        return <ToolbarButton
                            key={button.title}
                            title={button.title}
                            format={button.format}
                            updateStateCallback={this.props.updateStateCallback}
                            editorState={this.props.editorState}
                            handler={button.handler} />
                    } else if (button.type === 'color') {
                        return <ToolbarColorButton
                            key={button.title}
                            title={button.title}
                            format={button.format}
                            updateStateCallback={this.props.updateStateCallback}
                            editorState={this.props.editorState}
                            handler={button.handler} />
                    }
                })}
            </div>
        );
    }
}

export default Toolbar;
