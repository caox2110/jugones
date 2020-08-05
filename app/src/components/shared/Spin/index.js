import React from 'react'
import PropTypes from 'prop-types'

function Spin({
    visible,
    children
}) {
    if (visible)
        return (
            <span>Cargando...</span>
        )
    return children
}

Error.defaultProps = {
    visible: false,
}

Error.propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}

export default Spin