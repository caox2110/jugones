import React from 'react'
import PropTypes from 'prop-types'

// Estilos
import styles from './index.module.css'

function Container({
    children
}) {
    return (
        <div className={`App-teams App-flex ${styles.container}`}>
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired
}

export default Container