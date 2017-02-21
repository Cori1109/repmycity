export var productsReducer = (state = {all: [], active: null}, action) => {
  switch(action.type) {
    case 'ADD_PRODUCTS':
      return {
        ...state,
        all: action.products
      };
    case 'SET_ACTIVE_PRODUCT':
      return {
        ...state,
        active: {
          ...state.active,
          fetched: true,
          options: action.options
        }
      };
    case 'CLEAR_ACTIVE_PRODUCT':
      return {
        ...state,
        active: null
      };
    case 'UPDATE_ACTIVE_PRODUCT_OPTIONS':
      return {
        ...state,
        active: {
          ...state.active,
          options: action.options
        }
      };
    default:
      return state;
  }
};

export var collectionsReducer = (state = {all: [], active: null}, action) => {
  switch(action.type) {
    case 'ADD_COLLECTIONS':
      return {
        ...state,
        all: action.collections
      };
    case 'SET_ACTIVE_COLLECTION':
      return {
        ...state,
        active: action.parsedCollection
      };
    default:
      return state;
  }
};

export var cartReducer = (state = {isOpen: false, lineItems: []}, action) => {
  switch(action.type) {
    // case 'RESTORE_PREVIOUS_CART':
    //   return action.remoteCart;
    case 'SET_INITIAL_CART_STATE':
      return {
        ...action.localCart
      };
    case 'UPDATE_CART_ITEMS':
      return {
        ...state,
        lineItems: action.updatedCartItems
      };
    case 'UPDATE_CART_ITEMS_COUNT':
      return {
        ...state,
        lineItemsCount: action.updatedCartItemsCount
      };
    case 'UPDATE_CART_SUBTOTAL':
      return {
        ...state,
        subtotal: action.newSubtotal
      };
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};

export var navReducer = (state = {showClose: false, showNav: false}, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV_ICON':
      return {
        ...state,
        showClose: !state.showClose,
        showNav: state.showNav
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        showClose: !state.showClose,
        showNav: !state.showNav
      };
    case 'CLOSE_NAV':
      return {
        ...state,
        showClose: false,
        showNav: false
      };
    default:
      return state;
  }
};
