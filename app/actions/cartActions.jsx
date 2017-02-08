import shopifyAPI from 'shopifyAPI';

export var startAddorUpdateCartItem = (productVariant, quantity) => {
  return (dispatch, getState) => {
    let cart = getState().cart;
    let cartLineItem = findCartItemByVariantId(productVariant.variant_id);

    // function to check if product variant already exists in cart
    function findCartItemByVariantId(variantId) {
      return cart.lineItems.filter((item) => {
        return (item.variant_id === variantId);
      })[0];
    }

    if (cartLineItem) {
      console.log('this item was found in the cart, so just update it...', cartLineItem);
      dispatch(updateCartItem(cartLineItem, parseInt(quantity)));
    } else {
      console.log('this seems to be a new product, so add it to the cart as a new line item', productVariant);
      dispatch(addToCart(productVariant, quantity));
    }

    // update the cart subtotal
    dispatch(updateCartSubtotal());

    //  update the cart items count
    dispatch(updateCartItemsCount(quantity));
  }
};

// add product to cart
export var addToCart = (productVariant, quantity) => {
  return (dispatch, getState) => {
    shopifyAPI.cart.createLineItemsFromVariants({ variant: productVariant, quantity: quantity }).then(function(updatedCart) {
      let updatedCartItems = updatedCart.lineItems;
      dispatch({ type: 'UPDATE_CART_ITEMS', updatedCartItems });
    }).catch(function (errors) {
      console.log('Failed to addToCart', errors);
    });
  }
};

// update cart subtotal
export var updateCartSubtotal = () => {
  return (dispatch, getState) => {
    let newSubtotal = shopifyAPI.cart.subtotal;
    dispatch({ type: 'UPDATE_CART_SUBTOTAL', newSubtotal });
  }
};

// update cart items count
export var updateCartItemsCount = (quantity) => {
  return (dispatch, getState) => {
    let cart = getState().cart;
    let updatedCartItemsCount = parseInt(cart.lineItemsCount) + parseInt(quantity);
    console.log('new quantity: ', quantity);
    console.log('old quantity: ', cart.lineItemsCount);
    console.log('updatedCartItemsCount: ', updatedCartItemsCount);
    dispatch({ type: 'UPDATE_CART_ITEMS_COUNT', updatedCartItemsCount });

    if(parseInt(updatedCartItemsCount) < 1) {
      dispatch(closeCart());
    }else{
      dispatch(openCart());
    }
  }
};

// update a cart item
export var updateCartItem = (selectedCartItem, quantity) => {
  return (dispatch, getState) => {
    let cart = getState().cart;
    let updatedQuantity = selectedCartItem.quantity + quantity;
    let updatedCartItems = [];

    // if the new quantity is more than 0, keep it in the new array
    cart.lineItems.forEach((cartItem) => {
      if (selectedCartItem.id === cartItem.id) {
        if (updatedQuantity > 0) {
          let updatedCartItem = [];

          // clone the line item
          updatedCartItem = cartItem;

          // update the quantity of the new clone
          updatedCartItem.quantity = updatedQuantity;

          // return the updated cart item
          updatedCartItems.push(updatedCartItem);
        }
      }else{
        // return the unmodified item
        updatedCartItems.push(cartItem);
      }
    });

    // update the shopify cart api singleton
    shopifyAPI.cart.updateLineItem(selectedCartItem.id, updatedQuantity).then(() => {
      // update the local cart items (in redux store)
      dispatch({ type: 'UPDATE_CART_ITEMS', updatedCartItems });
    });
  }
};

// open cart
export var openCart = () => {
  return {
    type: 'OPEN_CART'
  }
};

// close cart
export var closeCart = () => {
  return {
    type: 'CLOSE_CART'
  }
};
