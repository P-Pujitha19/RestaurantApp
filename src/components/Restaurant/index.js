import {Component} from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import TabBar from '../TabBar'
import DishList from '../DishList'

class Restaurant extends Component {
  state = {
    menuData: [],
    activeCategoryIndex: 0,
    cartCount: {},
  }

  componentDidMount() {
    this.fetchMenuData()
  }

  fetchMenuData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    if (response.ok) {
      this.setState({
        menuData: data[0].table_menu_list,
        restaurantName: data[0].restaurant_name,
      })
    }
  }

  handleTabClick = index => {
    this.setState({activeCategoryIndex: index})
  }

  updateCount = (dishId, change) => {
    this.setState(prevState => {
      const currentCount = prevState.cartCount[dishId] || 0
      const newCount = Math.max(currentCount + change, 0)
      return {
        cartCount: {
          ...prevState.cartCount,
          [dishId]: newCount,
        },
      }
    })
  }

  getTotalItems = () => {
    const {cartCount} = this.state
    return Object.values(cartCount).reduce((total, count) => total + count, 0)
  }

  render() {
    const {menuData, activeCategoryIndex, cartCount, restaurantName} =
      this.state

    const totalItems = this.getTotalItems()
    const activeCategory = menuData[activeCategoryIndex] || {}

    return (
      <div className="restaurant-container">
        <header className="header">
          <h1>{restaurantName}</h1>

          <div className="cart-icon">
            <p>My Orders</p>

            <FaShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
        </header>

        {menuData.length > 0 ? (
          <>
            <ul>
              <TabBar
                categories={menuData}
                onTabClick={this.handleTabClick}
                activeIndex={activeCategoryIndex}
              />
            </ul>
            <ul>
              <DishList
                dishes={activeCategory.category_dishes || []}
                cartCount={cartCount}
                updateCount={this.updateCount}
              />
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

export default Restaurant
