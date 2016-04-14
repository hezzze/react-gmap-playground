/*
 * Marker example
 */

import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

import {getMarkerHolderStyle, getMarkerStyle, getMarkerTextStyle} from '../helpers/marker_styles';

const K_HINT_HTML_DEFAULT_Z_INDEX = 1000000;
const K_SCALE_HOVER = 1;
const K_SCALE_TABLE_HOVER = 1;
const K_SCALE_NORMAL = 0.65;
const K_MIN_CONTRAST = 0.4;


function calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle) {
  const contrast = K_MIN_CONTRAST + (1 - K_MIN_CONTRAST) * Math.min(scale / K_SCALE_NORMAL, 1);

  return {
    transform: `scale(${scale} , ${scale})`,
    WebkitTransform: `scale(${scale} , ${scale})`,
    filter: `contrast(${contrast})`,
    WebkitFilter: `contrast(${contrast})`,
    ...markerStyle,
    ...zIndexStyle,
    ...imageStyle
  };
}

function calcMarkerTextStyle(scale, markerTextStyle) {
  const K_MAX_COLOR_VALUE = 0;
  const K_MIN_COLOR_VALUE = 8;
  const colorV = Math.ceil(K_MIN_COLOR_VALUE + (K_MAX_COLOR_VALUE - K_MIN_COLOR_VALUE) * Math.min(scale / K_SCALE_NORMAL, 1));
  const colorHex = colorV.toString(16);
  const colorHTML = `#${colorHex}${colorHex}${colorHex}`;

  return {
    ...markerTextStyle,
    color: colorHTML
  };
}

export {K_SCALE_NORMAL};

export default class MapMarker extends Component {
  static propTypes = {
    $hover: PropTypes.bool,
    $dimensionKey: PropTypes.any,
    $getDimensions: PropTypes.func,
    $geoService: PropTypes.any,
    $onMouseAllow: PropTypes.func,

    marker: PropTypes.any,
    hoveredAtList: PropTypes.bool,
    scale: PropTypes.number,
    showBallon: PropTypes.bool,
    onCloseClick: PropTypes.func,
    showBallonState: PropTypes.bool.isRequired,
    onShowBallonStateChange: PropTypes.func.isRequired,

    // animation helpers
    hoverState: PropTypes.bool.isRequired,
    onHoverStateChange: PropTypes.func.isRequired,

    size: PropTypes.any,
    origin: PropTypes.any,
    imageClass: PropTypes.string,
    image: PropTypes.string,
    withText: PropTypes.bool,
    hintType: PropTypes.string
  };

  static defaultProps = {
    scale: K_SCALE_NORMAL,
    hoverState: false,
    showBallonState: false,
    withText: false,
    size: {width: 62, height: 60},
    origin: {x: 15 / 62, y: 1},
    imageClass: 'map-marker__marker--big',
    hintType: 'hint--info'
  };

  constructor(props) {
    super(props);
    this.alive = true;
  }

  componentWillUnmount() {
    // if (this.props.onCloseClick) {
    //   this.props.onCloseClick();
    // }
    this.alive = false;
  }

  // no optimizations at all
  render() {
    // TODO add http://schema.org/docs/gs.html
    let scale = this.props.$hover ? K_SCALE_HOVER : this.props.scale;
    scale = this.props.hoveredAtList ? K_SCALE_TABLE_HOVER : 0.65;

    const markerHolderStyle = getMarkerHolderStyle(this.props.size, this.props.origin);
    const markerStyle = getMarkerStyle(this.props.size, this.props.origin);

    const zIndexStyle = {
      zIndex: Math.round(scale * 10000) - (this.props.showBallon ? 20 : 0) + (this.props.$hover ? K_HINT_HTML_DEFAULT_Z_INDEX : 0) // balloon
    };

    const textStyleDef = getMarkerTextStyle();
    const textStyle = calcMarkerTextStyle(scale, textStyleDef);


    const imageClass = this.props.image ? '' : this.props.imageClass;
    const imageStyle = this.props.image ? {
      backgroundImage: `url(${this.props.image})`
    } : null;

    const styleMarkerMarker = calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle);

    // css hints library https://github.com/istarkov/html-hint
    return (
      <div style={markerHolderStyle} className='map-marker'>
        <div
          style={styleMarkerMarker}
          className={cx('map-marker__marker', imageClass)}>
          {this.props.withText ?
            <div style={textStyle}>
            {this.props.marker['number']}
            </div>
            :
            <div/>}
        </div>
      </div>
    );
  }
}
