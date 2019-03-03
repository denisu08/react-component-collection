import React from 'react';
import { storiesOf } from '@storybook/react';

import ExcelReader from './excel_reader';
import ExcelViewer from './excel_viewer';
import './excel_viewer/excel_viewer.css';

storiesOf('Excel Processor', module)
  .add('Reader', () => <ExcelReader text='The Comp' />)
  .add('Viewer', () => (
    <React.Fragment>
      <div class='example'>
        <h3>Simple Example Spreadsheet</h3>
        <div id='exampleOne'>
          <ExcelViewer
            config={{
              // Initial number of row
              rows: 5,
              // Initial number of columns
              columns: 8,
              // True if the first column in each row is a header (th)
              hasHeadColumn: true,
              // True if the data for the first column is just a string.
              // Set to false if you want to pass custom DOM elements.
              isHeadColumnString: true,
              // True if the first row is a header (th)
              hasHeadRow: true,
              // True if the data for the cells in the first row contains strings.
              // Set to false if you want to pass custom DOM elements.
              isHeadRowString: true,
              // True if the user can add rows (by navigating down from the last row)
              canAddRow: true,
              // True if the user can add columns (by navigating right from the last column)
              canAddColumn: true,
              // Override the display value for an empty cell
              emptyValueSymbol: '-',
              // Fills the first column with index numbers (1...n) and the first row with index letters (A...ZZZ)
              hasLetterNumberHeads: true,
            }}
            data={{
              rows: [
                ['Key', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'],
                ['COM', '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6'],
                ['DIV', '1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6'],
                ['DEV', '2,0', '2,1', '2,2', '2,3', '2,4', '2,5', '2,6'],
                ['ACC', '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6'],
              ],
            }}
          />
        </div>
      </div>
      <div class='example'>
        <h3>Fancy Editable Spreadsheet</h3>
        <div id='exampleTwo'>
          <ExcelViewer
            config={{
              rows: 5,
              columns: 5,
              headColumn: true,
              headColumnIsString: true,
              headRow: true,
              headRowIsString: true,
              canAddRow: false,
              canAddColumn: false,
              emptyValueSymbol: '-',
              letterNumberHeads: false,
            }}
            data={{
              rows: [
                ['Customer', 'Job', 'Contact', 'City', 'Revenue'],
                ['iDiscovery', 'Build', 'John Doe', 'Boston, MA', '500,000'],
                ['SxSW', 'Build', 'Tom Fuller', 'San Francisco, CA', '600,000'],
                [
                  'CapitalTwo',
                  'Failed',
                  'Eric Pixel',
                  'Seattle, WA',
                  '450,000',
                ],
              ],
            }}
            cellClasses={{
              rows: [
                ['', '', '', '', '', '', '', ''],
                ['green', '', '', '', '', '', '', 'dollar'],
                ['purple', '', '', '', '', '', '', 'dollar'],
                ['yellow', 'failed', '', '', '', '', '', 'dollar'],
              ],
            }}
          />
        </div>
      </div>
    </React.Fragment>
  ));
