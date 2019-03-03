import React from 'react';
import { storiesOf } from '@storybook/react';
import WysiwygEditor from './wysiwyg_editor';

storiesOf('Wysiwig Editor', module).add('Document Editor', () => (
  <WysiwygEditor />
));
