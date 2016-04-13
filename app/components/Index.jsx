import React from 'react';
import AltContainer from 'alt-container';

import MapActions from '../actions/MapActions';
import MapStore from '../stores/MapStore';
import MainMapBlock from '../components/MainMapBlock';

export default class Index extends React.Component {

  componentDidMount() {
    debugger;
    MapActions.query();
  }

  render() {
    return (
      <div>
        <div style={{position: 'absolute', left: 0, top: 0, width: '62%', height: '100%'}}>
          <AltContainer
            stores= { MapStore }
            actions={ MapActions }
            transform={({ MapStore, MapActions}) => {
              return Object.assign({
                center: MapStore.mapInfo.center,
                zoom: MapStore.mapInfo.zoom,
                markers: MapStore.dataFiltered,
                visibleRowFirst: MapStore.tableRowsInfo.visibleRowFirst,
                visibleRowLast: MapStore.tableRowsInfo.visibleRowLast,
                maxVisibleRows: MapStore.tableRowsInfo.maxVisibleRows,
                hoveredRowIndex: MapStore.tableRowsInfo.hoveredRowIndex,
                openBallonIndex: MapStore.openBallonIndex
              }, MapActions);
            }}>
            <MainMapBlock />
          </AltContainer>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: '38%', height: '100%'}}>
          // <IceTable />
        </div>
      </div>
    )
  }
}
