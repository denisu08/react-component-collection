import React, { Component } from 'react';

class ExcelViewer extends Component {
  render() {
    const { text } = this.props;

    return (
      <div className='App'>
        <header className='App-header'>{`"${text || ''}"`}</header>
      </div>
    );
  }
}

export default ExcelViewer;
