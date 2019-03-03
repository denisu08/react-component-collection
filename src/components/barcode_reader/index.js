import React, { Component } from 'react';
import Result from './Result';
import Scanner from './Scanner';

class BarcodeReader extends Component {
  state = { scanning: false, results: [] };

  constructor() {
    super();
    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
  }

  render() {
    const { scanning, results } = this.state;
    return (
      <div>
        <button onClick={this._scan}>{scanning ? 'Stop' : 'Start'}</button>
        <ul className='results'>
          {results.map(result => (
            <Result key={result.codeResult.code} result={result} />
          ))}
        </ul>
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    );
  }

  _scan() {
    this.setState({ scanning: !this.state.scanning });
  }

  _onDetected(result) {
    this.setState({ results: this.state.results.concat([result]) });
  }
}

export default BarcodeReader;
