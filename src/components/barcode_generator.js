import React, { Component } from 'react';

import Barcode from 'react-barcode';

class BarcodeGenerator extends Component {
  render() {
    return <Barcode value='http://github.com/kciter' />;
  }
}

export default BarcodeGenerator;
