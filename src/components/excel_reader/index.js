import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import readXlsxFile from 'read-excel-file';
import './excel_reader.css';

class ExcelReader extends Component {
  constructor() {
    super();
    this.onFileChange = this.onFileChange.bind(this);
  }

  render() {
    return (
      <div className='App'>
        <Input type='file' id='input' onChange={this.onFileChange} />
        <div style={{ fontSize: '12px' }} />
        <div id='result-table' />
        <pre id='result' />
      </div>
    );
  }

  onFileChange(e) {
    readXlsxFile(e.currentTarget.files[0], { dateFormat: 'MM/DD/YY' }).then(
      function(data) {
        // `data` is an array of rows
        // each row being an array of cells.
        document.getElementById('result').innerText = JSON.stringify(
          data,
          null,
          2,
        );

        document.getElementById('result-table').innerHTML =
          '<table>' +
          data
            .map(
              row =>
                '<tr>' +
                row
                  .map(cell => `<td>${cell === null ? '' : cell}</td>`)
                  .join('') +
                '</tr>',
            )
            .join('') +
          '</table>';
      },
      error => {
        console.error(error);
        alert(
          'Error while parsing Excel file. See console output for the error stack trace.',
        );
      },
    );
  }
}

export default ExcelReader;
