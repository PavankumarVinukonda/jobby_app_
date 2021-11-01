import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobsDetails} = props
  const {
    logoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    pakagePerAnnum,
    rating,
    title,
  } = jobsDetails

  return (
    <li className="bg-container">
      <div className="box-1">
        <img src={logoUrl} alt="logo" className="logo" />
        <div className="box-1-subbox">
          <h1 className="ratinng">{employmentType}</h1>
          <div className="ratingContainer">
            <AiFillStar className="star" />

            <h1 className="ratinng">{rating}</h1>
          </div>
        </div>
      </div>
      <div className="box-2">
        <div className="box-2-sub-box">
          <HiLocationMarker className="icons" />

          <h1 className="location"> {location} </h1>
          <BsFillBagFill className="icons" />

          <h1 className="location"> {employmentType} </h1>
        </div>
        <div className="box-2-subbox-2">
          <h1 className="salary">{pakagePerAnnum}</h1>
        </div>
      </div>
      <hr className="hrEl" />
      <div className="box-3">
        <h1 className="deacription-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobItem
