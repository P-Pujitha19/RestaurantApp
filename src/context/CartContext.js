import React, {Component} from 'react'

const CartContext = React.createContext()

class CartContextProvider extends Component {
  state = {
    cartList: [],
  }

  addCartItem = item => {
    this.setState(prev => {
      const existing = prev.cartList.find(i => i.dish_id === item.dish_id)
      if (existing) {
        return {
          cartList: prev.cartList.map(i =>
            i.dish_id === item.dish_id ? {...i, quantity: i.quantity + 1} : i,
          ),
        }
      }
      return {cartList: [...prev.cartList, {...item, quantity: 1}]}
    })
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(i => i.dish_id !== id),
    }))
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(i =>
        i.dish_id === id ? {...i, quantity: i.quantity + 1} : i,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(i => (i.dish_id === id ? {...i, quantity: i.quantity - 1} : i))
        .filter(i => i.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state
    const {children} = this.props // ✅ Destructured props here

    const contextValue = {
      cartList,
      addCartItem: this.addCartItem,
      removeCartItem: this.removeCartItem,
      removeAllCartItems: this.removeAllCartItems,
      incrementCartItemQuantity: this.incrementCartItemQuantity,
      decrementCartItemQuantity: this.decrementCartItemQuantity,
    }

    return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    )
  }
}

export {CartContext}
export default CartContextProvider
