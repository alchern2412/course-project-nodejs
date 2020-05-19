import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addExperience(formData, history)
    }

    return (
        <>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming positions
            that you have had in the past
            </p>

            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        value={title}
                        onChange={e => onChange(e)}
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={company}
                        onChange={e => onChange(e)}
                        type="text"
                        placeholder="* Company"
                        name="company"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={location}
                        onChange={e => onChange(e)}
                        type="text" placeholder="Location" name="location" />
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
                        /> Current Job
                </p>
                </div>
                <div className="form-group">
                    <textarea
                        value={description}
                        onChange={e => onChange(e)}
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a href="dashboard.html" className="btn my-1">Go Back</a>
            </form>
        </>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))
