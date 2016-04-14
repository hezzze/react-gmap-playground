import alt from '../alt';
import MapActions from '../actions/MapActions';


const K_LAST_VISIBLE_ROW_AT_SERVER_RENDERING = 5;

function ptInSect(x, a, b) {
  return (x - a) * (x - b) <= 0;
}

function ptInRect(pt, rect) {
  return ptInSect(pt['lat'], rect[0], rect[2]) && ptInSect(pt['lng'], rect[1], rect[3]);
}

// use rbush https://github.com/mourner/rbush if you have really big amount of points
function calcFilteredAndSortedMarkers(data, mapInfo) {
  const marginBounds = mapInfo && mapInfo['marginBounds'];

  if (!data || !marginBounds) {
    return [];
  }

  return data
    .filter(m => ptInRect(m, marginBounds));
}

function defaultMapState() {
  return {
    data: [],
    dataFiltered: [],

    mapInfo: {
      center: [59.938043, 30.337157],
      // set for server rendering for popular screen res
      bounds: [60.325132160343145, 29.13415407031249, 59.546382183279206, 31.54015992968749],
      marginBounds: [60.2843135300829, 29.21655153124999, 59.58811868963835, 31.45776246874999],
      zoom: 9
    },

    openBalloonIndex: -1,

    hoverMarkerIndex: -1,

    tableRowsInfo: {
      hoveredRowIndex: -1,
      visibleRowFirst: 0,
      visibleRowLast: K_LAST_VISIBLE_ROW_AT_SERVER_RENDERING,
      maxVisibleRows: K_LAST_VISIBLE_ROW_AT_SERVER_RENDERING
    }
  };
}

class MapStore {
  constructor() {

    Object.assign(this, defaultMapState());

    this.bindListeners({
      handleQuery: MapActions.QUERY,
      handleHoverIndexChange: MapActions.ON_HOVER_INDEX_CHANGE
    });
  }

  handleQuery(markersData) {

    this.data = markersData;

    this.dataFiltered = calcFilteredAndSortedMarkers(this.data, this.mapInfo);

    // return state
    //     .set('data', markersData)
    //     .update(s => s.set('dataFiltered', calcFilteredAndSortedMarkers(s.get('data'), s.get('mapInfo'))));

  }

  handleHoverIndexChange(index) {
    this.tableRowsInfo.hoveredRowIndex = index;
  }
}

export default alt.createStore(MapStore, 'MapStore');
