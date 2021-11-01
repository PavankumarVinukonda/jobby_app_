import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = props => {
  const FindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div>
      <Header />
      <div className="home-bg">
        <h1 className="headingEl">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="description">
          Millons of peoples are searching for jobs, salary <br /> information
          company reviews. Find the job that fits your <br /> abilities and
          potential
        </p>
        <button type="button" className="find-jobs-button" onClick={FindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
