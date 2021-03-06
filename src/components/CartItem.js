import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
// import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

function CartItem (props) {
  const { product, item, classes, onCartItemPlusOne, onCartItemMinusOne } = props
  return (
    <ListItem>
      <Avatar alt={product.title} src={ `/img/${product.image}` } />
      <ListItemText primary={product.title} secondary={product.artist} />
      <Button variant="fab" color="primary" aria-label="add" className={classes.button}
        onClick={() => onCartItemPlusOne(product.id)}>
        <AddIcon />
      </Button>
      <Button variant="fab" className={classes.button}>
        { item.qty }
      </Button>
      <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}
        onClick={() => onCartItemMinusOne(product.id)}>
        <RemoveIcon />
      </Button>
    </ListItem>
  )
}

CartItem.propTypes = {
  product: PropTypes.object,
  item: PropTypes.object,
  classes: PropTypes.object,
  onCartItemPlusOne: PropTypes.func,
  onCartItemMinusOne: PropTypes.func
}

export default withStyles(styles)(CartItem)
