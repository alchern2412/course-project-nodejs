import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData, history)
    }

    return (
        <>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school
                or bootcamp than you have attended
            </p>

            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        value={school}
                        onChange={e => onChange(e)}
                        type="text"
                        placeholder="* School or Bootcapm"
                        name="school"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={degree}
                        onChange={e => onChange(e)}
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={fieldofstudy}
                        onChange={e => onChange(e)}
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstudy"
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        value={from}
                        onChange={e => onChange(e)}
                        type="date" name="from" />
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}
                        type="date"
                        name="to"
                    />
                </div>

                <div className="form-group">
                    <p>
                        <input
                            checked={current}
                            value={current}
                            onChange={e => {
                                setFormData({
                                    ...formData,
                                    current: !current,
                                })
                                toggleDisabled(!toDateDisabled)
                            }}
                            type="checkbox"
                            name="current"
                        /> Current School
                </p>
                </div>
                <div className="form-group">
                    <textarea
                        value={description}
                        onChange={e => onChange(e)}
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a href="dashboard.html" className="btn my-1">Go Back</a>
            </form>
        </>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
