import shopifyAPI from 'shopifyAPI';

export var setActiveProduct = (id) => {
  return (dispatch) => {
    return shopifyAPI.client.fetchProduct(id).then((data) => {
      let product = data || {};
      let parsedProduct = {...product};
      dispatch({ type: 'SET_ACTIVE_PRODUCT', product });
    });
  };
};

export var clearActiveProduct = () => {
  return {
    type: 'CLEAR_ACTIVE_PRODUCT'
  };
};

// Add products to store
export var startAddProducts = () => {
  return (dispatch) => {
    return shopifyAPI.client.fetchAllProducts().then((data) => {
      let products = data || {};
      let parsedProducts = products.map((product, index) => {
        let updatedProduct = [];
        updatedProduct = product;
        updatedProduct.key = index;
        return updatedProduct;
      });

      dispatch(addProducts(parsedProducts));
      dispatch(preloadProductImages());
    });
  };
};

export var addProducts = (products) => {
  return {
    type: 'ADD_PRODUCTS',
    products
  };
};

export var preloadProductImages = () => {
  return (dispatch, getState) => {
    let products = getState().products.all;
    let images = [];
    products.map((product, index) => {
      images[index] = new Image();
      images[index].src = product.selectedVariant.imageVariants[4].src;
      return images[index];
    });
  };
};
