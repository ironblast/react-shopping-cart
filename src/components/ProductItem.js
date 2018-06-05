import React, { Component } from 'react'
import formatPrice from '../helpers/formatPrice'

class ProductItem extends Component {
  constructor (props) {
    super(props)
    this.onAdd = this.onAdd.bind(this)
  }
  onAdd (e) {
    // const { product: { id } } = this.props
    const id = this.props.product.id
    this.props.onAddToCart(id)
  }
  render () {
    const { product } = this.props
    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img className="card-img-top" alt={product.artist + ' ' + product.title} src={ `/img/${product.image}` } data-holder-rendered="true" />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">Album by {product.artist}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-primary" onClick={this.onAdd}>Add to Cart</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
              </div>
              <span className="text-muted">{formatPrice(product.price)}€</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductItem
