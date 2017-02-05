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
        active: action.parsedProduct
      };
    case 'CLEAR_ACTIVE_PRODUCT':
      return {
        ...state,
        active: null
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

export var cartReducer = (state = {isOpen: false, items: []}, action) => {
  switch(action.type) {
    case 'ADD_PRODUCT_TO_CART':
      return {
        ...state,
        items: [
          ...state.items,
          action.product
        ]
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
