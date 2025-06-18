import {Component} from 'react'
import DishCard from '../DishCard'

class DishList extends Component {
  render() {
    const {dishes} = this.props
    return (
      <div>
        {dishes.map(dish => (
          <DishCard key={dish.dish_id} dish={dish} />
        ))}
      </div>
    )
  }
}

export default DishList
