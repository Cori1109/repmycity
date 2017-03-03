import shopifyAPI from 'shopifyAPI';

// Add products to store
export var startAddProducts = () => {
  return (dispatch) => {
    return shopifyAPI.buyClient.fetchAllProducts().then((data) => {
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


// set active product
export var setActiveProduct = (options) => {
  return {
    type: 'SET_ACTIVE_PRODUCT',
    options
  };
};

// clear active product from redux
export var clearActiveProduct = () => {
  return {
    type: 'CLEAR_ACTIVE_PRODUCT'
  };
};

// update active product option
export var updateActiveProductOptions = (options) => {
  return {
    type: 'UPDATE_ACTIVE_PRODUCT_OPTIONS',
    options
  };
};
