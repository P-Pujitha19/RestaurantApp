import {Component} from 'react'
import DishCard from '../DishCard'

class DishList extends Component {
  render() {
    const {dishes, cartCount, updateCount} = this.props
    return (
      <div>
        {dishes.map(dish => (
          <DishCard
            key={dish.dish_id}
            dish={dish}
            count={cartCount[dish.dish_id] || 0}
            updateCount={updateCount}
          />
        ))}
      </div>
    )
  }
}

export default DishList
