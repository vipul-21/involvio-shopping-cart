import React from 'react';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ItemCard from '../components/ItemCard';

class GridContainer extends React.Component {
  itemAdded(item) {
    return _.findIndex(this.props.cart, i => i.productId === item.productId) > -1;
  }
  itemCount(item) {
    return _.find(this.props.cart, i => i.productId === item.productId);
  }
  render() {
    return (
      <Grid centered container columns={3}>
        {this.props.data.map(item => (
          <Grid.Column key={item.productId}><ItemCard
            item={item}
            addItem={this.props.addItem}
            removeItem={this.props.removeItem}
            added={this.itemAdded(item)}
            count={this.itemCount(item) && this.itemCount(item).count}
          />
          </Grid.Column>
      ))}
      </Grid>);
  }
}

GridContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    productName: PropTypes.string,
    price: PropTypes.string,
  })),
  cart: PropTypes.array,

  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

GridContainer.defaultProps = {
  data: [],
  cart: [],

  addItem: () => {},
  removeItem: () => {},
};

export default GridContainer;
