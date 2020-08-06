import React from 'react'
import PropTypes from 'prop-types'

// Estilos
import styles from './index.module.css'

function Select({
    label,
    name,
    value,
    onChange,
    disabled,
    children,
    className,
    style
}) {
    return (
        <div className={styles.items}>
            <label
                htmlFor={name}
                className={styles.label}
            >
                {label}
            </label>
            <select
                name={name}
                className={`${styles.select} ${className}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={style}
            >
                {children}
            </select>
        </div >
    )
}

Select.defaultProps = {
    label: 'Elegir',
    className: '',
    style: {}
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object

}

export default Select