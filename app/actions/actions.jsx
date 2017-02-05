import shopifyAPI from 'shopifyAPI';

export var setActiveProduct = (id) => {
  return (dispatch) => {
    return shopifyAPI.fetchProduct(id).then((data) => {
      let product = data || {};
      let parsedProduct = {...product.attrs};
      dispatch({ type: 'SET_ACTIVE_PRODUCT', parsedProduct });
    });
  };
};

export var setActiveCollection = (id) => {
  return (dispatch) => {
    return shopifyAPI.fetchCollection(id).then((data) => {
      let collection = data || {};
      let parsedCollection = {...collection.attrs};
      dispatch({ type: 'SET_ACTIVE_COLLECTION', parsedCollection });
    });
  };
};

// Add products to store
export var startAddProducts = () => {
  return (dispatch) => {
    return shopifyAPI.fetchAllProducts().then((data) => {
      var products = data || {};
      var parsedProducts = [];

      Object.keys(products).forEach((productId) => {
        parsedProducts.push({
          key: productId,
          ...products[productId].attrs
        });
      });

      dispatch(addProducts(parsedProducts));
    });
  };
};

export var addProducts = (products) => {
  return {
    type: 'ADD_PRODUCTS',
    products
  };
};


// Add collections to store
export var startAddCollections = () => {
  return (dispatch) => {
    return shopifyAPI.fetchAllCollections().then((data) => {
      var collections = data || {};
      var parsedCollections = [];

      Object.keys(collections).forEach((collectionId) => {
        parsedCollections.push({
          key: collectionId,
          ...collections[collectionId].attrs
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

export var addToCart = (product) => {
  // let variantId = product.selectedVariant.id;
  // let cartItems;
  // if(cartItems.length > 0 && !this.checkIfItemExistsInCart(variantId)){
  //   console.log('add the new product to cart');
  // }else{
  //   console.log('increment existing product quantity');
  // }

  // checkIfItemExistsInCart(productId){
  //   for (let item of this.state.cartItems){
  //     if (item.id === productId){
  //       return true;
  //     }else{
  //       return false;
  //     }
  //   }
  // }

  return dispatch => {
    dispatch({ type: 'ADD_PRODUCT_TO_CART', product });
    dispatch(openCart());
  }
};

export var openCart = () => {
  return {
    type: 'OPEN_CART'
  }
};

export var closeCart = () => {
  return {
    type: 'CLOSE_CART'
  }
};
