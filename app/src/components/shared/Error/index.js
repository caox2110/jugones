import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.css'

function Error({
    visible,
    message,
    children
}) {
    if (visible)
        return (
            <Fragment>
                <div className={styles.container} >
                    <span className={styles.message}>{message}</span>
                </div>
                {children}
            </Fragment>
        )
    return children
}

Error.defaultProps = {
    visible: false,
    message: 'Algo ha ido mal'
}

Error.propTypes = {
    visible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Error