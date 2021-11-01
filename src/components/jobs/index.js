import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import JobItem from '../JobItem'
import EmploymentCard from '../EmploymentCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Job extends Component {
  state = {
    JobsData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activerEmploymetnId: null,
    fullTime: false,
    partTime: false,
    freelance: false,
    internship: false,
    fullTimevalue: '',
    partimeValue: '',
    freelaceValue: '',
    internshipValue: '',
  }

  componentDidMount() {
    this.getData()
  }

  /// making an api call to get data
  getData = async () => {
    const {
      JobsData,
      apiStatus,
      searchInput,
      fullTimevalue,
      partimeValue,
      internshipValue,
      freelaceValue,
    } = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const EmploymentTypeString = `${fullTimevalue},${partimeValue},${internshipValue},${freelaceValue}`

    const url = `https://apis.ccbp.in/jobs?employment_type=${EmploymentTypeString}&minimum_package=1000000&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.jobs

      const updatedData = fetchedData.map(eachItem => ({
        logoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        pakagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        JobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  /// from employment type
  onChangeJobType = item => {
    const {
      activerEmploymetnId,
      fullTime,
      partTime,
      internship,
      freelance,
      fullTimevalue,
      partimeValue,
      internshipValue,
      freelaceValue,
    } = this.state
    this.setState({
      activerEmploymetnId: item,
    })

    switch (activerEmploymetnId) {
      case employmentTypesList[0].employmentTypeId:
        return this.setState(
          prvState => ({
            fullTime: !prvState.fullTime,
          }),
          this.onChangeFulltime,
        )
      case employmentTypesList[1].employmentTypeId:
        return this.setState(prvState => ({
          partTime: !prvState.partTime,
        }))
      case employmentTypesList[2].employmentTypeId:
        return this.setState(prvState => ({
          freelance: !prvState.freelance,
        }))
      case employmentTypesList[3].employmentTypeId:
        return this.setState(prvState => ({
          internship: !prvState.internship,
        }))

      default:
        return null
    }
  }

  onChangeFulltime = () => {
    const {fullTime, fullTimevalue} = this.state
    if (fullTime) {
      this.setState({
        fullTimevalue: employmentTypesList[0].label,
      })
    } else {
      this.setState({
        fullTimevalue: '',
      })
    }
  }

  onChangefreelance = () => {
    const {freelance, freelaceValue} = this.state
    if (freelance) {
      this.setState({
        freelaceValue: employmentTypesList[2].label,
      })
    } else {
      this.setState({
        freelaceValue: '',
      })
    }
  }

  onChangeinternship = () => {
    const {internship, internshipValue} = this.state
    if (internship) {
      this.setState({
        internshipValue: employmentTypesList[3].label,
      })
    } else {
      this.setState({
        internshipValue: '',
      })
    }
  }

  onChangePartTime = () => {
    const {partTime, partimeValue} = this.state
    if (partTime) {
      this.setState({
        partimeValue: employmentTypesList[1].label,
      })
    } else {
      this.setState({
        partimeValue: '',
      })
    }
  }

  renderEmploymentCard = () => (
    <ul>
      {employmentTypesList.map(eachItem => (
        <EmploymentCard
          empDetails={eachItem}
          key={eachItem.id}
          onChangeJobType={this.onChangeJobType}
        />
      ))}
    </ul>
  )

  /// rendering search bar

  searchItem = event => {
    this.setState(
      {
        searchInput: event.target.value,
      },
      this.getData,
    )
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="inputContainer">
        <input
          type="text"
          value={searchInput}
          className="inputElement"
          onChange={this.searchItem}
        />
        <div className="serachIconCont">
          <BsSearch className="searchIcon" />
        </div>
      </div>
    )
  }

  renderJobDetailsContainer = () => {
    const {JobsData} = this.state
    return (
      <ul>
        {JobsData.map(eachItem => (
          <JobItem jobsDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderJobDetailsContainerNoJobs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="noJobs"
      />
    </div>
  )

  renderJobDetailsContainerfailure = () => (
    <div className="failureViewList">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureView"
      />
      <button className="retryBtn">retryNow</button>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsContainer()
      case apiStatusConstants.failure:
        return this.renderJobDetailsContainerfailure()
      default:
        return null
    }
  }

  render() {
    const {JobsData} = this.state
    console.log(JobsData)
    return (
      <div>
        {this.renderEmploymentCard()}
        {this.renderSearchBar()}
        {this.renderAll()}
      </div>
    )
  }
}

export default Job
