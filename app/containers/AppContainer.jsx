import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';

import { addItem, removeItem } from '../redux/actions/home';

import GridContainer from '../components/GridContainer';
import TopBar from '../components/TopBar';

const styles = {
  cardContainer: {
    display: 'flex',
    paddingTop: '4em',
  },
};

const AppContainer = props => (
  <div>
    <TopBar
      data={props.cart}
      addItem={props.addItem}
      removeItem={props.removeItem}
    />

    <div style={styles.cardContainer}>
      <GridContainer
        data={props.items}
        addItem={props.addItem}
        removeItem={props.removeItem}
        cart={props.cart}
      />
    </div>
  </div>
);

AppContainer.propTypes = {
  items: PropTypes.array.isRequired,
  cart: PropTypes.array,

  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

AppContainer.defaultProps = {
  cart: [],

  addItem: () => {},
  removeItem: () => {},
};

function mapStateToProps(state) {
  return {
    items: state.homeState.items,
    cart: state.homeState.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) => {
      dispatch(addItem(item));
    },
    removeItem: (item) => {
      dispatch(removeItem(item));
    },
  };
}
const RadiumAppContainer = Radium(AppContainer);

export default connect(mapStateToProps, mapDispatchToProps)(RadiumAppContainer);
