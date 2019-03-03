import React from 'react';
import { storiesOf } from '@storybook/react';

import MyComponent from './my_component';
import MyComponentMarkdownText from './my_component.md';

// const withDocs = withInfo(MyComponentMarkdownText);

storiesOf('MyComponent', module)
  .addParameters({
    info: {
      // Make a default for all stories in this book,
      inline: true, // where the components are inlined
      styles: {
        header: {
          h1: {
            color: 'red' // and the headers of the sections are red.
          }
        }
      }
    }
  })
  .addDecorator(story => <div style={{ textAlign: 'center' }}>{story()}</div>)
  .add('without props', () => <MyComponent />, {
    info: {
      text: `
            description or documentation about my component, supports markdown
  
            ~~~js
            <Button>Click Here</Button>
            ~~~
          `
    }
  })
  .add('with some props', () => <MyComponent text="The Comp" />, {
    notes: { markdown: MyComponentMarkdownText }
  });
