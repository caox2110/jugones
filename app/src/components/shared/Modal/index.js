import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

// Estilos
import styles from './index.module.css'

function Modal({
    visible,
    closeModal,
    children,
    title
}) {

    const closeClass = useMemo(() => (visible ? null : styles.closed))

    const closeModalAction = () => {
        closeModal()
    }

    return (
        <Fragment>
            <div className={`${styles.overlay} ${closeClass}`}></div>
            <div className={`${styles.modal} ${closeClass}`}>
                <div className={`${styles.title}`}>
                    <h3>{title}</h3>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.footer}>
                    <button
                        className={styles.closeButton}
                        onClick={closeModalAction}
                    >
                        Cerrar
                     </button>
                </div>
            </div>
        </Fragment>
    )
}

Modal.defaultProps = {
    visible: false,
    title: 'Modal'
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default Modal