import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import BarcodeGenerator from './barcode_generator';
import BarcodeReader from './barcode_reader';

storiesOf('Barcode', module)
  .addDecorator(withKnobs)
  .add('Generator', () => (
    <BarcodeGenerator
      isQRCode={boolean('isQRCode', false)}
      size={number('size', 100)}
      text={text('text', 'blank')}
    />
  ))
  .add('Reader', () => <BarcodeReader text='The Comp' />);
