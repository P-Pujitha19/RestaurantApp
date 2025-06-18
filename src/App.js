import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Restaurant from './components/Restaurant'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContextProvider from './context/CartContext'

const App = () => (
  <BrowserRouter>
    <CartContextProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Restaurant} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Redirect to="/login" />
      </Switch>
    </CartContextProvider>
  </BrowserRouter>
)

export default App
