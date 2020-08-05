import React, { Fragment, useState } from 'react'

// Componentes
import Pichichis from '../../Pichichis'
import { Modal } from '../../shared'

// Estilos
import styles from './index.module.css'

function Header() {

    const [visible, setVisible] = useState(false)

    const toogleModal = () => {
        setVisible(!visible)
    }

    return (
        <Fragment>
            <header className={`App-flex ${styles.headerBar}`}>
                <button
                    className={styles.pichichisButton}
                    onClick={toogleModal}
                >
                    pichichis
                     </button>
            </header>
            <Modal
                visible={visible}
                closeModal={toogleModal}
            >
                <Pichichis
                    modalVisible={visible}
                />
            </Modal>
        </Fragment>
    )
}

export default Header