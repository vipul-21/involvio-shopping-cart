import _ from 'lodash';
import data from '../../mockData';

// Items stores all the items and cart stores the added item
const defaultHomeState = {
  items: data,
  cart: [],
};

const Home = (state = defaultHomeState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId } = action.item;
      const current = state.cart;
      const index = _.findIndex(current, { productId });
      if (index !== -1) { // If the item is already added
        return Object.assign({}, state, {
          cart: state.cart.map((item, i) => {
            if (i === index) {
              return Object.assign({}, item, {
                count: item.count + 1,
              });
            }
            return item;
          }),
        });
      }
      return Object.assign({}, state, {
        cart: [...state.cart, Object.assign({}, action.item, { count: 1 })],
      });
    }
    case 'REMOVE_ITEM': {
      const { productId } = action.item;
      const current = state.cart;
      const selectedItem = _.find(current, { productId });
      if (selectedItem.count > 1) { // If the added item has quantity more than one
        return Object.assign({}, state, {
          cart: state.cart.map((item) => {
            if (item.productId === selectedItem.productId) {
              return Object.assign({}, item, {
                count: item.count - 1,
              });
            }
            return item;
          }),
        });
      }
      return Object.assign({}, state, {
        cart: state.cart.filter(item => item.productId !== productId),
      });
    }
    default:
      return state;
  }
};

export default Home;
