import {Component} from 'react'
import {CartContext} from '../../context/CartContext'

class DishCard extends Component {
  render() {
    const {dish} = this.props
    const {
      cartList,
      addCartItem,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
    } = this.context

    const item = cartList.find(i => i.dish_id === dish.dish_id)
    const quantity = item ? item.quantity : 0
    const showCategorization = dish.addonCat && dish.addonCat.length > 0

    return (
      <li className="dish-card">
        <div>
          <h1>{dish.dish_name}</h1>
          <p>
            {dish.dish_currency} {dish.dish_price}
          </p>
          <p>{dish.dish_description}</p>
          <p>{dish.dish_calories} calories</p>

          {dish.dish_Availability ? (
            <>
              {quantity === 0 ? (
                <button type="button" onClick={() => addCartItem(dish)}>
                  Add to Cart
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => decrementCartItemQuantity(dish.dish_id)}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    type="button"
                    onClick={() => incrementCartItemQuantity(dish.dish_id)}
                  >
                    +
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Not available</p>
          )}

          {showCategorization && <p>Customizations available</p>}
        </div>
        <img src={dish.dish_image} alt={dish.dish_name} />
      </li>
    )
  }
}

DishCard.contextType = CartContext

export default DishCard
