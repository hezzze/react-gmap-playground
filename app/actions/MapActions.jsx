import alt from '../alt';

class MapActions {

  constructor(data) {
    this.generateActions('query', 'onHoverIndexChange');
  }

  onBoundsChange({center, zoom, bounds, marginBounds}) {
    return {center, zoom, bounds, marginBounds};
  }
}

export default alt.createActions(MapActions);
