import React from 'react'
import styles from './Header.module.scss'

export const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.iconBlock}>
          <a
            target="_blank"
            className={styles.logo}
            alt="Solomon Anomet O'jay"
            href="https://www.instagram.com/solomonojay/"
          >
            <img className={styles.avatar} src="/instaSmall.png" alt="user" />
          </a>
          <a
            target="_blank"
            className={styles.logo}
            alt="Fridays For Future Uganda"
            href="https://twitter.com/Fridays4FutureU"
          >
            <img className={styles.avatar} src="/FridayUganda.png" alt="user" />
          </a>

          <a
            target="_blank"
            className={styles.logo}
            alt="Earth Volunteers"
            href="https://earthvolunteers.org/"
          >
            <img className={styles.avatar} src="/earTh.png" alt="user" />
          </a>
        </div>

        <a target="_blank" className={styles.logo} href="http://hestamp.me/">
          <div className={styles.logoBan}>
            <h5 style={{ margin: 0 }}>Developed by</h5>
            <img className={styles.avatar2} src="/meLogo.png" alt="user" />
          </div>
        </a>
      </div>
    </div>
  )
}
