import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';

const styles = {
  container: {
    padding: '1em',
    textAlign: 'center',
    minHeight: '10em',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    minHeight: '3em',
  },
  price: {
    fontWeight: 600,
  },
  addedItem: {
    display: 'flex',
  },
  count: {
    padding: '0.5em 1em',
  },
};

const ItemCard = props => (
  <Card centered style={styles.container}>
    <div style={styles.text}>
          Product name : {props.item.productName}
    </div>
    <div style={[styles.text, styles.price]}>
          Price: ${props.added ? (props.count * props.item.price).toFixed(2)
            : parseFloat(props.item.price).toFixed(2)}
    </div>
    <div style={styles.actionContainer}>
      { props.added ?
        <div style={styles.addedItem}>
          <Button basic icon="minus" color="red" onClick={() => props.removeItem(props.item)} />
          <div style={styles.count}>
            {props.count}
          </div>
          <Button basic icon="plus" color="green" onClick={() => props.addItem(props.item)} />
        </div>
            :
        <Button basic color="green" onClick={() => props.addItem(props.item)}>
              Add to cart
        </Button>
          }
    </div>
  </Card>);

ItemCard.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string,
    productName: PropTypes.string,
    price: PropTypes.string,
  }),
  added: PropTypes.bool,
  count: PropTypes.number,

  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

ItemCard.defaultProps = {
  item: {
    name: '',
    price: -1,
    productId: -1,
  },
  added: false,
  count: 0,

  addItem: () => {},
  removeItem: () => {},
};


export default Radium(ItemCard);
