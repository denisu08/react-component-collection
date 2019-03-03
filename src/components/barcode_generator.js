import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';

class BarcodeGenerator extends Component {
  render() {
    const { isQRCode } = this.props;
    const text = this.props.text || 'blank';
    const size = this.props.size || 100;
    return isQRCode ? (
      <QRCode value={text} renderAs='svg' size={size} />
    ) : (
      <Barcode value={text} height={size} width={size / 50} />
    );
  }
}

BarcodeGenerator.propTypes = {
  text: PropTypes.string,
  isQRCode: PropTypes.bool,
  size: PropTypes.number,
};

export default BarcodeGenerator;
