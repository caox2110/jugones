import React from 'react'
import PropTypes from 'prop-types'

// Estilos
import styles from './index.module.css'

function Player({
    player
}) {
    
    const { name, img, position, team } = player

    return (
        <li
            className={styles.cardItem}
        >
            <div className={styles.card}>
                <div className={styles.logoContainer}>
                    <img
                        src={team.shield}
                        alt={team.name}
                        className={styles.logo}
                    />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.cardImageContainer} >
                        <img
                            src={img}
                            alt={name}
                            className={styles.cardImage}
                        />
                    </div>
                    <div className={styles.nameContainer} >
                        <span className={styles.name}>{name} <span className={styles.position}> {position}</span> </span>
                        <br />
                        <span className={styles.team}>{team.name} </span>
                    </div>
                </div>
            </div>
        </li>
    )
}

Player.propTypes = {
    player: PropTypes.object.isRequired
}

export default Player