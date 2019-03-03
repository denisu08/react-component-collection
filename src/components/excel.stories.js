import React from 'react';
import { storiesOf } from '@storybook/react';

import ExcelReader from './excel_reader';
import ExcelViewer from './excel_viewer';

storiesOf('Excel Processor', module)
  .add('Reader', () => <ExcelReader text='The Comp' />)
  .add('Viewer', () => <ExcelViewer text='The Comp' />);
