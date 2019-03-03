import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

class WysiwygEditor extends Component {
  render() {
    return (
      <CKEditor
        onInit={editor => {
          console.log('Editor is ready to use!', editor);

          // Insert the toolbar before the editable area.
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement(),
            );
        }}
        onChange={(event, editor) => console.log({ event, editor })}
        editor={DecoupledEditor}
        data='<p><mark class="pen-red">Hello</mark>, please edit <b>me</b>!</p><figure class="media ck-widget ck-widget_selected" contenteditable="false"><div class="ck-media__wrapper" data-oembed-url="https://www.youtube.com/watch?v=PDy4_j-hU3U"><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;"><iframe src="https://www.youtube.com/embed/PDy4_j-hU3U" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe></div></div></figure>'
      />
    );
  }
}

export default WysiwygEditor;
