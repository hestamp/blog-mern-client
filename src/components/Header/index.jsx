import React from 'react'
import { Link } from 'react-router-dom'

import { logout } from '../../redux/slices/auth'
import styles from './Header.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'

export const Header = () => {
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
          <div className={styles.logoBan}>
            <img className={styles.avatar} src="/logo192.png" alt="user" />
            <h3 style={{ margin: 0 }}>CLIMATE WAR</h3>
          </div>
        </Link>
        <div className={styles.buttons}>
          {isAuth ? (
            <div className={styles.block}>
              <Link className={styles.avaLink} to="/profile">
                <img
                  className={styles.avatar}
                  src={userData?.avatarUrl || '/noavatar.png'}
                  alt="user"
                />
              </Link>

              <button onClick={onClickLogout} className={styles.butLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.butLogin}>Login</button>
              </Link>
              <Link to="/register">
                <button className={styles.butSign}>Sign in</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
