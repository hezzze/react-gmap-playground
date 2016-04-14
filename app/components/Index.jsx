import React from 'react';
import AltContainer from 'alt-container';

import MapActions from '../actions/MapActions';
import MapStore from '../stores/MapStore';
import MainMapBlock from '../components/MainMapBlock';

import genMarkersData from '../sources/dataGen';

const ASYNC_ROUNDTRIP_DELAY = 130;

export default class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  onStoreChange() {
    this.setState({
      data: MapStore.getState().dataFiltered
    });
  };

  componentDidMount() {

    new Promise((resolve, reject) => {

      let params = {
        count: 30, seed: 7, test: false, latVarM: 2, lngVarM: 4.5,
        typeGetter: i => i % 2,
        cacheBreaker: 6
      };


      setTimeout( () => resolve(genMarkersData(params)), ASYNC_ROUNDTRIP_DELAY );
    }).then(data => MapActions.query(data));

    MapStore.listen(this.onStoreChange.bind(this));

  }

  _clickSomething(index) {
    MapActions.onHoverIndexChange(index);
  }

  _renderList() {
    return (
      <ul>
        {this.state.data.map((d, i) => (
          <button onClick={this._clickSomething.bind(this, i)}>{d.id}</button>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div style={{position: 'absolute', left: 0, top: 0, width: '62%', height: '100%'}}>
          <AltContainer
            stores= {[MapStore]}
            actions={ MapActions }
            inject={{
              center: () => MapStore.state.mapInfo.center,
              zoom: ()=> MapStore.state.mapInfo.zoom,
              markers: ()=> MapStore.state.dataFiltered,
              visibleRowFirst: ()=> MapStore.state.tableRowsInfo.visibleRowFirst,
              visibleRowLast: ()=> MapStore.state.tableRowsInfo.visibleRowLast,
              maxVisibleRows: ()=> MapStore.state.tableRowsInfo.maxVisibleRows,
              hoveredIndex: ()=> MapStore.state.tableRowsInfo.hoveredRowIndex,
              openBallonIndex: ()=> MapStore.state.openBallonIndex
            }}>
            <MainMapBlock />
          </AltContainer>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: '38%', height: '100%'}}>
          {this._renderList()}
        </div>
      </div>
    )
  }
}
