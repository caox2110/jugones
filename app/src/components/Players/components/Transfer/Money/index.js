import React from 'react'
import PropTypes from 'prop-types'

// Estilos
import styles from './index.module.css'

function Money({
    money
}) {
    return (
        <div className={styles.money}>
            <h1>{money}.00</h1>
        </div>
    )
}

Money.propTypes = {
    money: PropTypes.number.isRequired
}

export default Money