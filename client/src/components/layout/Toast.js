import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { unsetToast } from '../../actions/auth'

const Toast = ({ toast, unsetToast }) => {
    const { addToast } = useToasts()

    useEffect(() => {
        if (toast.message.length > 0 && toast.appearance.length > 0) {
            addToast(toast.message, {
                appearance: toast.appearance,
                autoDismiss: true
            })
            unsetToast()
        }
    }, [toast])

    return null
}

Toast.propTypes = {
    toast: PropTypes.object.isRequired,
    unsetToast: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    toast: state.auth.toast
})

export default connect(mapStateToProps, { unsetToast })(Toast)

