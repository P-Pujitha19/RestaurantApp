import {Component} from 'react'
import {CartContext} from '../../context/CartContext'

class Cart extends Component {
  render() {
    const {
      cartList,
      removeAllCartItems,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      removeCartItem,
    } = this.context

    return (
      <div>
        <h1>Cart</h1>
        <button type="button" onClick={removeAllCartItems}>
          Remove All
        </button>
        {cartList.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cartList.map(item => (
              <li key={item.dish_id}>
                <img src={item.dish_image} alt={item.dish_name} />
                <p>{item.dish_name}</p>
                <p>
                  {item.dish_currency} {item.dish_price * item.quantity}
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => decrementCartItemQuantity(item.dish_id)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => incrementCartItemQuantity(item.dish_id)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeCartItem(item.dish_id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

Cart.contextType = CartContext

export default Cart
