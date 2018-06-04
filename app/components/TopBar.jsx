import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, Grid, Popup } from 'semantic-ui-react';

import ItemCard from '../components/ItemCard';

const styles = {
  container: {
    position: 'fixed',
    zIndex: '1',
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 1px 0px',
    background: 'white',
    height: '3em',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.5em',
    padding: '0.35em 1em',
  },
  popup: {
    maxHeight: '30em',
    overflow: 'auto',
  },
  totalCost: {
    textAlign: 'center',
    fontSize: '1.25em',
    fontWeight: 600,
    padding: '0.5em',
  },
  popupContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '1em',

  },
};

const CartPopup = props => (
  <Popup
    trigger={<Button color="teal" icon="cart" content={props.totalCount} />}
    content={
      <div>
        {props.data.map(data => (
          <Grid.Row key={data.productId}>
            <ItemCard
              item={data}
              addItem={props.addItem}
              removeItem={props.removeItem}
              added
              count={data.count}
            />
          </Grid.Row>
    ))}
        <div style={styles.totalCost}>
      Total Cost : ${props.totalCost}
        </div>
      </div>}
    on="click"
    position="bottom right"
    style={styles.popup}
  />
);

CartPopup.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    productName: PropTypes.string,
    price: PropTypes.string,
  })),
  totalCount: PropTypes.number,
  totalCost: PropTypes.number,

  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

CartPopup.defaultProps = {
  data: [],
  totalCount: 0,
  totalCost: 0,

  addItem: () => {},
  removeItem: () => {},
};


class TopBar extends React.Component {
  totalCount() {
    return _.sumBy(this.props.data, item => item.count);
  }
  totalCost() {
    return _.sumBy(this.props.data, item => parseFloat((item.count * item.price).toFixed(2)), 10);
  }
  render() {
    return (
      <div style={styles.container}>
        <span style={styles.title}>Shopping cart</span>
        <div style={styles.popupContainer}>
          <CartPopup
            data={this.props.data}
            addItem={this.props.addItem}
            removeItem={this.props.removeItem}
            totalCost={this.totalCost().toFixed(2)}
            totalCount={this.totalCount()}
          />
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    productName: PropTypes.string,
    price: PropTypes.string,
  })),

  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

TopBar.defaultProps = {
  data: [],

  addItem: () => {},
  removeItem: () => {},
};


export default Radium(TopBar);
