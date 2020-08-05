import React from 'react'

// Estilos
import styles from './index.module.css'

function Header() {
    return (
        <header className={`App-flex ${styles.headerBar}`}>
            <button className={styles.pichichisButton}>pichichis</button>
        </header>
    )
}

export default Header