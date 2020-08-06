import React from 'react'
import PropTypes from 'prop-types'

function Option({
    index,
    value,
    children
}) {
    const key = index ? index : value
    return (
        <option
            key={key}
            value={value}
        >
            {children}
        </option>
    )
}

Option.propTypes = {
    children: PropTypes.node.isRequired
}

export default Option