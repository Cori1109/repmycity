import shopifyAPI from 'shopifyAPI';

export var setActiveCollection = (id) => {
  return (dispatch) => {
    return shopifyAPI.client.fetchCollection(id).then((data) => {
      let collection = data || {};
      let parsedCollection = {...collection};
      dispatch({ type: 'SET_ACTIVE_COLLECTION', parsedCollection });
    });
  };
};

// Add collections to store
export var startAddCollections = () => {
  return (dispatch) => {
    return shopifyAPI.client.fetchAllCollections().then((data) => {
      var collections = data || {};
      var parsedCollections = [];

      Object.keys(collections).forEach((collectionId) => {
        parsedCollections.push({
          key: collectionId,
          ...collections[collectionId]
        });
      });

      dispatch(addCollections(parsedCollections));
    });
  };
};

export var addCollections = (collections) => {
  return {
    type: 'ADD_COLLECTIONS',
    collections
  };
};
