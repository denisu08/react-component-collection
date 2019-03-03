import React from 'react';
import PropTypes from 'prop-types';
import Quagga from 'quagga';

const scanner_default_config = {
  inputStream: {
    type: 'LiveStream',
    constraints: {
      width: { min: 640 },
      height: { min: 480 },
      facingMode: 'environment',
      aspectRatio: { min: 1, max: 2 },
    },
  },
  locator: {
    patchSize: 'medium',
    halfSample: true,
  },
  numOfWorkers: 2,
  frequency: 10,
  decoder: {
    readers: [
      {
        format: 'code_128_reader',
        config: {},
      },
    ],
  },
  locate: true,
};

class Scanner extends React.Component {
  state = {};

  constructor() {
    super();
    var resultCollector = Quagga.ResultCollector.create({
      capture: true,
      capacity: 20,
      blacklist: [
        {
          code: 'WIWV8ETQZ1',
          format: 'code_93',
        },
        {
          code: 'EH3C-%GU23RK3',
          format: 'code_93',
        },
        {
          code: 'O308SIHQOXN5SA/PJ',
          format: 'code_93',
        },
        {
          code: 'DG7Q$TV8JQ/EN',
          format: 'code_93',
        },
        {
          code: 'VOFD1DB5A.1F6QU',
          format: 'code_93',
        },
        {
          code: '4SO64P4X8 U4YUU1T-',
          format: 'code_93',
        },
      ],
      filter: function(codeResult) {
        // only store results which match this constraint
        // e.g.: codeResult
        return true;
      },
    });

    this.setState({ resultCollector });
  }

  componentDidMount() {
    this.init();
  }

  init() {
    Quagga.init(scanner_default_config, function(err) {
      if (err) {
        return this.handleError(err);
      }
      //Quagga.registerResultCollector(resultCollector);
      this.attachListeners();
      this.checkCapabilities();
      Quagga.start();
    });
  }

  handleError(err) {
    console.log(err);
  }

  checkCapabilities() {
    var track = Quagga.CameraAccess.getActiveTrack();
    var capabilities = {};
    if (typeof track.getCapabilities === 'function') {
      capabilities = track.getCapabilities();
    }
    this.applySettingsVisibility('zoom', capabilities.zoom);
    this.applySettingsVisibility('torch', capabilities.torch);
  }

  updateOptionsForMediaRange(node, range) {
    console.log('updateOptionsForMediaRange', node, range);
    var NUM_STEPS = 6;
    var stepSize = (range.max - range.min) / NUM_STEPS;
    var option;
    var value;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    for (var i = 0; i <= NUM_STEPS; i++) {
      value = range.min + stepSize * i;
      option = document.createElement('option');
      option.value = value;
      option.innerHTML = value;
      node.appendChild(option);
    }
  }

  applySettingsVisibility(setting, capability) {
    // depending on type of capability
    if (typeof capability === 'boolean') {
      var node = document.querySelector(
        'input[name="settings_' + setting + '"]',
      );
      if (node) {
        node.parentNode.style.display = capability ? 'block' : 'none';
      }
      return;
    }
    if (
      window.MediaSettingsRange &&
      capability instanceof window.MediaSettingsRange
    ) {
      var node = document.querySelector(
        'select[name="settings_' + setting + '"]',
      );
      if (node) {
        this.updateOptionsForMediaRange(node, capability);
        node.parentNode.style.display = 'block';
      }
      return;
    }
  }

  initCameraSelection() {
    var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

    return Quagga.CameraAccess.enumerateVideoDevices().then(function(devices) {
      function pruneText(text) {
        return text.length > 30 ? text.substr(0, 30) : text;
      }
      var $deviceSelection = document.getElementById('deviceSelection');
      while ($deviceSelection.firstChild) {
        $deviceSelection.removeChild($deviceSelection.firstChild);
      }
      devices.forEach(function(device) {
        var $option = document.createElement('option');
        $option.value = device.deviceId || device.id;
        $option.appendChild(
          document.createTextNode(
            pruneText(device.label || device.deviceId || device.id),
          ),
        );
        $option.selected = streamLabel === device.label;
        $deviceSelection.appendChild($option);
      });
    });
  }

  attachListeners() {
    var self = this;

    self.initCameraSelection();
    // $('.controls').on('click', 'button.stop', function(e) {
    //   e.preventDefault();
    //   Quagga.stop();
    //   self._printCollectedResults();
    // });
    // $('.controls .reader-config-group').on('change', 'input, select', function(
    //   e,
    // ) {
    //   e.preventDefault();
    //   var $target = $(e.target),
    //     value =
    //       $target.attr('type') === 'checkbox'
    //         ? $target.prop('checked')
    //         : $target.val(),
    //     name = $target.attr('name'),
    //     state = self._convertNameToState(name);

    //   console.log('Value of ' + state + ' changed to ' + value);
    //   self.setState(state, value);
    // });
  }

  _printCollectedResults() {
    // var results = this.state.resultCollector.getResults(),
    //   $ul = $('#result_strip ul.collector');
    // results.forEach(function(result) {
    //   var $li = $(
    //     '<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>',
    //   );
    //   $li.find('img').attr('src', result.frame);
    //   $li
    //     .find('h4.code')
    //     .html(result.codeResult.code + ' (' + result.codeResult.format + ')');
    //   $ul.prepend($li);
    // });
  }

  _accessByPath(obj, path, val) {
    var parts = path.split('.'),
      depth = parts.length,
      setter = typeof val !== 'undefined' ? true : false;

    return parts.reduce(function(o, key, i) {
      if (setter && i + 1 === depth) {
        if (typeof o[key] === 'object' && typeof val === 'object') {
          Object.assign(o[key], val);
        } else {
          o[key] = val;
        }
      }
      return key in o ? o[key] : {};
    }, obj);
  }

  _convertNameToState(name) {
    return name
      .replace('_', '.')
      .split('-')
      .reduce(function(result, value) {
        return result + value.charAt(0).toUpperCase() + value.substring(1);
      });
  }

  detachListeners() {
    // $('.controls').off('click', 'button.stop');
    // $('.controls .reader-config-group').off('change', 'input, select');
  }

  applySetting(setting, value) {
    var track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.getCapabilities === 'function') {
      switch (setting) {
        case 'zoom':
          return track.applyConstraints({
            advanced: [{ zoom: parseFloat(value) }],
          });
        case 'torch':
          return track.applyConstraints({ advanced: [{ torch: !!value }] });
        default:
          break;
      }
    }
  }

  // setState(path, value) {
  //   var self = this;

  //   if (typeof self._accessByPath(self.inputMapper, path) === 'function') {
  //     value = self._accessByPath(self.inputMapper, path)(value);
  //   }

  //   if (path.startsWith('settings.')) {
  //     var setting = path.substring(9);
  //     return self.applySetting(setting, value);
  //   }
  //   self._accessByPath(self.state, path, value);

  //   console.log(JSON.stringify(self.state));
  //   this.detachListeners();
  //   Quagga.stop();
  //   this.init();
  // }

  // componentDidMount() {
  //   Quagga.init(scanner_default_config, function(err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     Quagga.start();
  //   });
  //   Quagga.onDetected(this._onDetected);
  // }

  // componentWillUnmount() {
  //   Quagga.offDetected(this._onDetected);
  // }

  // _onDetected(result) {
  //   this.props.onDetected(result);
  // }

  render() {
    return <div id='interactive' className='viewport' />;
  }
}

Scanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
};

export default Scanner;
