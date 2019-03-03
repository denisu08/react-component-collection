import React from 'react';
import { storiesOf } from '@storybook/react';

import BarcodeGenerator from './barcode_generator';
import BarcodeReader from './barcode_reader';

storiesOf('Barcode', module)
  .add('Generator', () => <BarcodeGenerator text='The Comp' />)
  .add('Reader', () => <BarcodeReader text='The Comp' />);
