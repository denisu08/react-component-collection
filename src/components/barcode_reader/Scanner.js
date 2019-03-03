import React from 'react';
import PropTypes from 'prop-types';
import Quagga from 'quagga';

class Scanner extends React.Component {
  constructor() {
    super();
    this._onDetected = this._onDetected.bind(this);
  }

  render() {
    return <div id='interactive' className='viewport' />;
  }

  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facing: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['code_128_reader'],
        },
        locate: true,
      },
      err => {
        if (err) {
          return console.log(err);
        }
        this.checkCapabilities();
        this.initCameraSelection();
        Quagga.start();
      },
    );
    Quagga.onDetected(this._onDetected);
  }

  checkCapabilities() {
    var track = Quagga.CameraAccess.getActiveTrack();
    var capabilities = {};
    if (typeof track.getCapabilities === 'function') {
      capabilities = track.getCapabilities();
    }
    // this.applySettingsVisibility('zoom', capabilities.zoom);
    // this.applySettingsVisibility('torch', capabilities.torch);
  }

  initCameraSelection() {
    var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

    return Quagga.CameraAccess.enumerateVideoDevices().then(devices => {
      function pruneText(text) {
        return text.length > 30 ? text.substr(0, 30) : text;
      }
      // var $deviceSelection = document.getElementById("deviceSelection");
      // while ($deviceSelection.firstChild) {
      //     $deviceSelection.removeChild($deviceSelection.firstChild);
      // }
      devices.forEach(function(device) {
        // var $option = document.createElement("option");
        // $option.value = device.deviceId || device.id;
        // $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
        // $option.selected = streamLabel === device.label;
        // $deviceSelection.appendChild($option);
        console.log(
          'add',
          pruneText(device.label || device.deviceId || device.id),
        );
      });
    });
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }
}

Scanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
};

export default Scanner;
