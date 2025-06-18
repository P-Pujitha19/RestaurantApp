import {Component} from 'react'

class DishCard extends Component {
  render() {
    const {dish, count, updateCount} = this.props
    const showCategorization = dish.addonCat && dish.addonCat.length > 0
    return (
      <li key={dish.dish_id} className="dish-card">
        <div className="dish-info">
          <h1>{dish.dish_name}</h1>
          <p>{`${dish.dish_currency} ${dish.dish_price}`}</p>
          <p>{dish.dish_description}</p>
          <p>{`${dish.dish_calories} calories`}</p>

          {dish.dish_Availability ? (
            <div className="dish-controls">
              <button
                type="button"
                onClick={() => updateCount(dish.dish_id, -1)}
              >
                -
              </button>
              <p>{count ?? 0}</p>
              <button
                type="button"
                onClick={() => updateCount(dish.dish_id, 1)}
              >
                +
              </button>
            </div>
          ) : (
            <p>Not available</p>
          )}

          {showCategorization && <p>Customizations available</p>}
        </div>
        <div>
          <img
            src={dish.dish_image}
            alt={dish.dish_name}
            className="dish-image"
          />
        </div>
      </li>
    )
  }
}

export default DishCard
