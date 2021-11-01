import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errormsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmiting = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const usedetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(usedetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        errormsg: data.error_msg,
      })
    }
  }

  renderLoginFrom = () => {
    const {username, password, errormsg} = this.state

    return (
      <div className="form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo"
        />
        <form onSubmit={this.onSubmiting}>
          <label htmlFor="username" className="label">
            Username
          </label>
          <br />
          <input
            id="username"
            type="text"
            className="inputElement"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <br />
          <label htmlFor="password" className="label">
            Password
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="inputElement"
            placeholder="Username"
            value={password}
            onChange={this.onChangePassword}
          />
          <br />
          <button type="submit" className="loginBtn">
            Login
          </button>
          <p className="errormsg">{errormsg}</p>
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return <div className="bg-container">{this.renderLoginFrom()}</div>
  }
}

export default Login
