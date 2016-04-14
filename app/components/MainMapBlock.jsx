import React, {PropTypes, Component} from 'react';
import controllable from 'react-controllables';
import GoogleMap from 'google-map-react';
import Marker, {K_SCALE_NORMAL} from './Marker';

import {getScale, getRealFromTo} from '../helpers/calc_markers_visibility';
import markerDescriptions from '../constants/marker_descriptions';
import {customDistanceToMouse} from '../helpers/custom_distance';

import {List} from 'immutable';

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

const K_SCALE_TABLE_HOVER = 1;


@controllable(['center', 'zoom', 'markers'])
export default class MainMapBlock extends Component {
  static propTypes = {
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onBoundsChange: PropTypes.func,
    onMarkerHover: PropTypes.func,
    onChildClick: PropTypes.func,
    center: PropTypes.any,
    zoom: PropTypes.number,
    markers: PropTypes.any,
    visibleRowFirst: PropTypes.number,
    visibleRowLast: PropTypes.number,
    maxVisibleRows: PropTypes.number,
    hoveredRowIndex: PropTypes.number,
    openBallonIndex: PropTypes.number
  };

  static defaultProps = {
    center: new List([59.744465, 30.042834]),
    zoom: 10,
    visibleRowFirst: -1,
    visibleRowLast: -1,
    hoveredRowIndex: -1
  };

  constructor(props) {
    super(props);
    this._distanceToMouse = customDistanceToMouse;
    this._onBoundsChange = this._onBoundsChange.bind(this);
  }

  _onBoundsChange(center, zoom, bounds, marginBounds) {
    if (this.props.onBoundsChange) {
      this.props.onBoundsChange({center, zoom, bounds, marginBounds});
    } else {
      this.props.onCenterChange(center);
      this.props.onZoomChange(zoom);
    }
  }


  render() {
    const [rowFrom, rowTo] = [0, 5];

    // const {rowFrom, rowTo} = getRealFromTo(this.props.visibleRowFirst, this.props.visibleRowLast, this.props.maxVisibleRows, this.props.markers.size);

    const Markers = this.props.markers &&
      this.props.markers.filter((m, index) => index >= rowFrom && index <= rowTo)
      .map((marker, index) => (
        <Marker
          // required props
          key={marker['id']}
          lat={marker['lat']}
          lng={marker['lng']}
          // any user props
          hoveredAtList={index + rowFrom === this.props.hoveredIndex}
          {...markerDescriptions[marker['type']]}
          marker={marker} />
      ));

    return (
      <GoogleMap
        // apiKey={null}
        center={this.props.center}
        zoom={this.props.zoom}
        onBoundsChange={this._onBoundsChange}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        hoverDistance={K_HOVER_DISTANCE}
        distanceToMouse={this._distanceToMouse}
        >
        {Markers}
      </GoogleMap>
    );
  }
}
