import React from 'react';
import {RichUtils} from "draft-js";

const handler = (editorState, updateStateCallback, format) => {
    updateStateCallback(RichUtils.toggleInlineStyle(editorState, format));
}

export default [{
    title: 'Bold',
    format: 'BOLD',
    handler: handler,
    type: 'simple'
}, {
    title: 'Italic',
    format: 'ITALIC',
    handler: handler,
    type: 'simple'
}, {
    title: 'Underline',
    format: 'UNDERLINE',
    handler: handler,
    type: 'simple'
}];
