import alt from 'alt';
import genMarkersData from '../sources/dataGen';

const ASYNC_ROUNDTRIP_DELAY = 130;

class MapActions {

  query() {
    return new Promise((resolve, reject) => {

      let params = {
        count: 30, seed: 7, test: false, latVarM: 2, lngVarM: 4.5,
        typeGetter: i => i % 6,
        cacheBreaker: 6
      };

      setTimeout( () => resolve(genMarkersData(params)), ASYNC_ROUNDTRIP_DELAY );
    });
  }

  onBoundsChange({center, zoom, bounds, marginBounds}) {
    return {center, zoom, bounds, marginBounds};
  }
}

export default alt.createActions(MapActions);
