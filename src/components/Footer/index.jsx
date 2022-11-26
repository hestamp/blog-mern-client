import React from 'react'
import { Link } from 'react-router-dom'

import { logout } from '../../redux/slices/auth'
import styles from './Header.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'

export const Footer = () => {
  const isAuth = useSelector(selectIsAuth)
  const userData = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout())
      window.localStorage.clear('token')
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          <h3 style={{ margin: 0 }}>CLIMATE WAR</h3>
        </Link>

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
