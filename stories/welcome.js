import React from 'react';
import PropTypes from 'prop-types';

const Main = props => (
  <article
    {...props}
    style={{
      margin: 15,
      maxWidth: 600,
      lineHeight: 1.4,
      fontFamily:
        '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
    }}
  />
);

const Title = ({ children, ...props }) => <h1 {...props}>{children}</h1>;
Title.propTypes = {
  children: PropTypes.node,
};
Title.defaultProps = {
  children: undefined,
};

const Note = props => (
  <p
    {...props}
    style={{
      opacity: 0.5,
    }}
  />
);

const InlineCode = props => (
  <code
    {...props}
    style={{
      fontSize: 15,
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a',
    }}
  />
);

const Link = ({ children, href, ...props }) => (
  <a
    href={href}
    {...props}
    style={{
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
    }}
  >
    {children}
  </a>
);
Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};
Link.defaultProps = {
  href: undefined,
  children: undefined,
};

const NavButton = ({ children, ...props }) => (
  <button
    {...props}
    type='button'
    style={{
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
      borderTop: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      cursor: 'pointer',
      font: 'inherit',
    }}
  >
    {children}
  </button>
);

NavButton.propTypes = {
  children: PropTypes.node,
};
NavButton.defaultProps = {
  children: undefined,
};

export const Welcome = ({ showApp }) => (
  <Main>
    <Title>Welcome to "Seagapp Storybook"</Title>
    <p>This is a UI component dev environment for your app.</p>
    <p>
      We've added some basic component stories inside the{' '}
      <InlineCode>src/components/*.stories</InlineCode> directory.
      <br />
      <br />
      (Basically these components stories is like a visual test case.)
    </p>

    <Note>
      <b>NOTE:</b>
      <br />
      Have a look at the <InlineCode>
        .storybook/webpack.config.js
      </InlineCode>{' '}
      to add webpack loaders and plugins you are using in this project.
    </Note>
  </Main>
);
Welcome.displayName = 'Welcome';
Welcome.propTypes = {
  showApp: PropTypes.func,
};
Welcome.defaultProps = {
  showApp: null,
};

export default Welcome;
