import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  inProgres: 'INP',
  success: 'SUC',
  failure: 'FAIL',
}

class Profile extends Component {
  state = {
    apiStaus: apiStatusConstants.inProgres,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.profile_details

      const UpdatedData = {
        imgUrl: fetchedData.profile_image_url,
        name: fetchedData.name,
        bio: fetchedData.short_bio,
      }
      console.log(UpdatedData)
      this.setState({
        apiStaus: apiStatusConstants.success,
        profiledata: UpdatedData,
      })
    } else {
      this.setState({
        apiStaus: apiStatusConstants.failure,
      })
      console.log('failure')
    }
  }

  renderLoading = () => (
    <div className="for-loading">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="for-failure-view">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profiledata} = this.state
    const {imgUrl, name, bio} = profiledata
    return (
      <div className="profilecont">
        <img src={imgUrl} alt={name} className="profileLogo" />
        <h1 className="profileName">{name}</h1>
        <p className="description">{bio}</p>
      </div>
    )
  }

  render() {
    const {apiStaus} = this.state

    switch (apiStaus) {
      case apiStatusConstants.inProgres:
        return <div className="bg-Container"> {this.renderLoading()} </div>
      case apiStatusConstants.success:
        return <div className="bg-Container"> {this.renderProfile()} </div>
      case apiStatusConstants.failure:
        return <div className="bg-Container"> {this.renderFailure()} </div>
      default:
        return null
    }
  }
}

export default Profile
