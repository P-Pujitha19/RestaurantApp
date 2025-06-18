import {Component} from 'react'

class TabBar extends Component {
  render() {
    const {categories, onTabClick, activeIndex} = this.props
    return (
      <li className="tab-bar" key={categories.menu_category_id}>
        {categories.map((category, index) => (
          <button
            type="button"
            className={`tab-button ${activeIndex === index ? 'active' : ''}`}
            onClick={() => onTabClick(index)}
          >
            {category.menu_category}
          </button>
        ))}
      </li>
    )
  }
}

export default TabBar
