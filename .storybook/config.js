import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

addDecorator(story => <div style={{ textAlign: 'left' }}>{story()}</div>);

const req = require.context('../src/components', true, /\.stories\.js$/);
function loadStories() {
  require('../stories');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
