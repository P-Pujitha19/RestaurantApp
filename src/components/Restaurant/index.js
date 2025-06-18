import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {CartContext} from '../../context/CartContext'
import TabBar from '../TabBar'
import DishList from '../DishList'

class Restaurant extends Component {
  state = {
    menuData: [],
    activeCategoryIndex: 0,
    restaurantName: '',
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

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onCartClick = () => {
    const {history} = this.props
    history.push('/cart')
  }

  onTitleClick = () => {
    const {history} = this.props
    history.push('/')
  }

  handleTabClick = index => {
    this.setState({activeCategoryIndex: index})
  }

  render() {
    const {cartList} = this.context
    const {menuData, activeCategoryIndex, restaurantName} = this.state

    const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)
    const activeCategory = menuData[activeCategoryIndex] || {}

    return (
      <div className="restaurant-container">
        <header className="header">
          <h1 onClick={this.onTitleClick}>{restaurantName}</h1>

          <div
            className="cart-icon"
            data-testid="cart"
            onClick={this.onCartClick}
            role="button"
            tabIndex="0"
          >
            <FaShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          <button type="button" onClick={this.onLogout}>
            Logout
          </button>
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
              <DishList dishes={activeCategory.category_dishes || []} />
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

Restaurant.contextType = CartContext

export default withRouter(Restaurant)
