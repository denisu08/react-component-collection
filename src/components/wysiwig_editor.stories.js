import React from 'react';
import { storiesOf } from '@storybook/react';
import WysiwigEditor from './wysiwig_editor';

storiesOf('Wysiwig Editor', module).add('Document Editor', () => (
  <WysiwigEditor />
));
