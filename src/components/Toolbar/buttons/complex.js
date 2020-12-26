import {EditorState, RichUtils, Modifier} from "draft-js";
import constants from '../../../constants';

const anotherStyleMap = {
    CODE: {
        backgroundColor: '#ccc',
        padding: '3px',
        borderRadius: '3px',
        fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace'
    }
}

const COLORS = constants.COLORS;

const colorStyleMap = {};
const backgroundStyleMap = {};

Object.keys(COLORS).map(index => {
    colorStyleMap['COLOR_' + index] = {};
    colorStyleMap['COLOR_' + index].color = COLORS[index];
});

Object.keys(COLORS).map(index => {
    backgroundStyleMap['BACKGROUND_' + index] = {};
    backgroundStyleMap['BACKGROUND_' + index].backgroundColor = COLORS[index];
});

export const styleMap = {
    ...anotherStyleMap,
    ...colorStyleMap,
    ...backgroundStyleMap
}

const handler = (editorState, updateStateCallback, style) => {
    const selection = editorState.getSelection();

    // новое состояние
    let nextEditorState = EditorState.push(
        editorState,
        editorState.getCurrentContent(),
        'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    if (currentStyle) {
        nextEditorState = currentStyle.reduce((state, style) => {
            return RichUtils.toggleInlineStyle(state, style);
        }, nextEditorState);
    }
    //
    // // если текст не выделен, включим или отключим формат
    // if (selection.isCollapsed()) {
    //     nextEditorState = currentStyle.reduce((state, style) => {
    //         return RichUtils.toggleInlineStyle(state, style);
    //     }, nextEditorState);
    // }

    // применим формат
    if (!currentStyle.has(style)) {
        nextEditorState = RichUtils.toggleInlineStyle(
            nextEditorState,
            style
        );
    }

    updateStateCallback(nextEditorState);
}

export default [{
    title: 'Code',
    format: 'CODE',
    handler: handler,
    type: 'simple'
}, {
    title: 'Background',
    format: 'BACKGROUND',
    handler: handler,
    type: 'color'
}, {
    title: 'Color',
    format: 'COLOR',
    handler: handler,
    type: 'color'
}];
