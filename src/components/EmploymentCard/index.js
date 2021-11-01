import './index.css'

const EmploymentCard = props => {
  const {empDetails, onChangeJobType} = props
  const {label, employmentTypeId} = empDetails

  const onChange = () => {
    onChangeJobType(employmentTypeId)
  }

  return (
    <li className="listItem">
      <input type="checkBox" className="checkbox" onChange={onChange} />
      <h1 className="title">{label}</h1>
    </li>
  )
}

export default EmploymentCard
