import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpreadsheetComponent from 'react-spreadsheet-component';
import './excel.css';

class ExcelViewer extends Component {
  render() {
    const { data, config, cellClasses } = this.props;

    return (
      <SpreadsheetComponent
        initialData={data}
        config={config}
        cellClasses={cellClasses}
        spreadsheetId='1'
      />
    );
  }
}

ExcelViewer.propTypes = {
  config: PropTypes.any,
  data: PropTypes.array,
  cellClasses: PropTypes.any,
};

export default ExcelViewer;
