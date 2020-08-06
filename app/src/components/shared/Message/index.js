import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// Constantes
import { messagesConstants as constants } from '../../../constants'

// Estilos
import styles from './index.module.css'

const { SUCCESS, WARNING, ERROR } = constants

function Message({
    visible,
    message,
    children,
    level
}) {

    let messageStyle = styles.message
    switch (level) {
        case WARNING:
            messageStyle += ` ${styles.warning}`
            break
        case SUCCESS:
            messageStyle += ` ${styles.success}`
            break
        default:
            messageStyle += ` ${styles.error}`
            break
    }

    if (visible)
        return (
            <Fragment>
                <div className={styles.container} >
                    <span className={messageStyle}>{message}</span>
                </div>
                {children}
            </Fragment>
        )

    return children
}

Message.defaultProps = {
    visible: false,
    message: 'Algo ha ido mal',
    level: ERROR
}

Message.propTypes = {
    visible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Message