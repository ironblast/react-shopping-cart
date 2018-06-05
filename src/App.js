import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import PaginatedProductTable from './components/PaginatedProductTable'
import Cart from './components/Cart'

import './css/App.css'

const albums = [
  { id: 10, price: 899, artist: 'Coldplay', title: 'Parachutes', slug: 'coldplay-parachutes', image: 'coldplay-parachutes.jpg' },
  { id: 20, price: 899, artist: 'Coldplay', title: 'A Rush of Blood to the Head', slug: 'coldplay-a-rush-of-blood-to-the-head', image: 'coldplay-a-rush-of-blood-to-the-head.jpg' },
  { id: 30, price: 999, artist: 'Coldplay', title: 'X&Y', slug: 'coldplay-x-and-y', image: 'coldplay-x-and-y.jpg' },
  { id: 40, price: 1309, artist: 'Coldplay', title: 'Viva la Vida', slug: 'coldplay-viva-la-vida', image: 'coldplay-viva-la-vida.jpg' },
  { id: 50, price: 899, artist: 'Daft Punk', title: 'Homework', slug: 'daft-punk-homework', image: 'daft-punk-homework.jpg' },
  { id: 60, price: 1239, artist: 'Daft Punk', title: 'Random Access Memories', slug: 'daft-punk-random-access-memories', image: 'daft-punk-random-access-memories.jpg' },
  { id: 70, price: 1199, artist: 'Eddie Vedder', title: 'Into The Wild', slug: 'eddie-vedder-into-the-wild', image: 'eddie-vedder-into-the-wild.jpg' },
  { id: 80, price: 1299, artist: 'Eddie Vedder', title: 'Ukulele Songs', slug: 'eddie-vedder-ukulele-songs', image: 'eddie-vedder-ukulele-songs.jpg' },
  { id: 90, price: 1199, artist: 'Jack Johnson', title: 'Brushfire Fairytales', slug: 'jack-johnson-brushfire-fairytales', image: 'jack-johnson-brushfire-fairytales.jpg' },
  { id: 100, price: 1049, artist: 'Jack Johnson', title: 'In Between Dreams', slug: 'jack-johnson-in-between-dreams', image: 'jack-johnson-in-between-dreams.jpg' },
  { id: 110, price: 1399, artist: 'Jeff Beck', title: 'Loud Hailer', slug: 'jeff-beck-loud-hailer', image: 'jeff-beck-loud-hailer.jpg' },
  { id: 120, price: 1499, artist: 'John Mayer', title: 'Born and Raised', slug: 'john-mayer-born-and-raised', image: 'john-mayer-born-and-raised.jpg' },
  { id: 130, price: 1099, artist: 'John Mayer', title: 'Room for Squares', slug: 'john-mayer-room-for-squares', image: 'john-mayer-room-for-squares.jpg' },
  { id: 140, price: 1099, artist: 'John Mayer', title: 'Where The Light Is', slug: 'john-mayer-where-the-light-is', image: 'john-mayer-where-the-light-is.jpg' },
  { id: 150, price: 899, artist: 'Johnny Cash', title: 'Ring Of Fire', slug: 'johnny-cash-ring-of-fire', image: 'johnny-cash-ring-of-fire.jpg' },
  { id: 160, price: 1049, artist: 'Johnny Cash', title: 'The Essential', slug: 'johnny-cash-the-essential', image: 'johnny-cash-the-essential.jpg' },
  { id: 170, price: 1199, artist: 'Joni Mitchell', title: 'Blue', slug: 'joni-mitchell-blue', image: 'joni-mitchell-blue.jpg' },
  { id: 180, price: 1099, artist: 'Nirvana', title: 'Nevermind', slug: 'nirvana-nevermind', image: 'nirvana-nevermind.jpg' }
]

const withProps = ({ props, Component }) => routerProps => <Component {...props} {...routerProps} />

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      albums,
      user: null,
      cart: []
    }
    this.onAddToCart = this.onAddToCart.bind(this)
    this.onRemoveFromCart = this.onRemoveFromCart.bind(this)
    this.onCartItemPlusOne = this.onCartItemPlusOne.bind(this)
    this.onCartItemMinusOne = this.onCartItemMinusOne.bind(this)
  }
  // reçoit productId
  onAddToCart (productId) {
    // const cart = this.state.cart
    const { cart } = this.state

    // Copie le cart dans newCart
    const newCart = [...cart]

    // Cherche l'index de l'élément dans le tableau
    const indexInCart = cart.findIndex(item => item.id === productId)

    // Si élément non trouvé
    if (indexInCart === -1) {
      newCart.push({ id: productId, qty: 1 })
    }
    else {
      newCart[indexInCart].qty += 1
    }

    this.setState(() => ({
      cart: newCart
    }))
  }
  // reçoit productId
  onRemoveFromCart (productId) {
    // const cart = this.state.cart
    const { cart } = this.state

    // Copie le cart dans newCart
    const newCart = [...cart]

    // Cherche l'index de l'élément dans le tableau
    const indexInCart = cart.findIndex(item => item.id === productId)

    // Si élément non trouvé
    if (indexInCart === -1) {
      return
    }
    else {
      newCart.splice(indexInCart, 1)
    }

    this.setState(() => ({
      cart: newCart
    }))
  }
  // reçoit productId
  onCartItemPlusOne (productId) {
    this.onCartItemModifyQty(productId, 1)
  }
  // reçoit productId
  onCartItemMinusOne (productId) {
    this.onCartItemModifyQty(productId, 1)
  }

  onCartItemModifyQty(productId, increment) {
    // const cart = this.state.cart
    const { cart } = this.state

    // Copie le cart dans newCart
    const newCart = [...cart]

    // Cherche l'index de l'élément dans le tableau
    const indexInCart = cart.findIndex(item => item.id === productId)

    // Si élément non trouvé
    if (indexInCart === -1) {
      return
    }
    else {
      newCart[indexInCart].qty += increment
    }

    this.setState(() => ({
      cart: newCart
    }))
  }
  render () {
    const { onAddToCart, onRemoveFromCart, onCartItemPlusOne, onCartItemMinusOne } = this
    const ProductTableWithProps = withProps({ props: { products: this.state.albums, onAddToCart }, Component: PaginatedProductTable } )
    const CartWithProps = withProps({ props: { products: this.state.albums, cart: this.state.cart, onRemoveFromCart, onCartItemPlusOne, onCartItemMinusOne }, Component: Cart } )
    return (
      <Router>
        <div className="App container">
          <Navbar user={this.state.user} cart={this.state.cart} />

          <Switch>
            <Route exact path="/" component={ProductTableWithProps} />
            <Route path="/page/:page" component={ProductTableWithProps} />
            <Route path="/cart" component={CartWithProps} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
