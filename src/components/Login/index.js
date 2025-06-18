import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => this.setState({username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => this.setState({password: e.target.value})}
        />
        <button type="submit">Login</button>
        {showError && <p>{errorMsg}</p>}
      </form>
    )
  }
}

export default Login
