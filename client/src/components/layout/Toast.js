import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

const Toast = ({ toast }) => {
    const { addToast } = useToasts()

    useEffect(() => {
        addToast(toast.message, {
            appearance: toast.appearance,
            autoDismiss: true
        })
    }, [toast])

    return (<></>)
}

Toast.propTypes = {
    toast: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    toast: state.auth.toast
})

export default connect(mapStateToProps)(Toast)

