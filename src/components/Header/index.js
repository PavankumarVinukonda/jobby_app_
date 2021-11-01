import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiShoppingBag} from 'react-icons/fi'

import {ImExit} from 'react-icons/im'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="websiteLogo"
      />
      <div className="thumbnails-container">
        <Link to="/" className="linkel">
          <h1 className="thumbnail">Home</h1>
          <AiFillHome className="HomeIcon" />
        </Link>
        <Link to="/jobs" className="linkel">
          <h1 className="thumbnail">Jobs</h1>
          <FiShoppingBag className="HomeIcon" />
        </Link>
      </div>
      <button type="button" className="btn" onClick={onClickLogout}>
        <h1 className="logout-button"> Logout </h1>
        <ImExit className="HomeIcon" />
      </button>
    </nav>
  )
}

export default withRouter(Header)
