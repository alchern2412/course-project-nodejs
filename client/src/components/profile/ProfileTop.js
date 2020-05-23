import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: {
            name,
            avatar
        }
    }
}) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />

            <h1 className="large">{name}</h1>
            <p className="lead">{status} {company && <span> at {company}</span>}</p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {
                    website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-globe fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter-square fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook-square fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin-square fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.instagram && (
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.vk && (
                        <a href={social.vk} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-vk fa-2x"></i>
                        </a>
                    )
                }

            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
