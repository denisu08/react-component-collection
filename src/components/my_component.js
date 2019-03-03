import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    const { text } = this.props;

    return (
      <div className="App">
        <header className="App-header">{`"${text || ''}"`}</header>
      </div>
    );
  }
}

export default MyComponent;
