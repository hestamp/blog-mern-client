import React from 'react'
import { Link } from 'react-router-dom'

import { logout } from '../../redux/slices/auth'
import styles from './Header.module.scss'
import Container from '@mui/material/Container'
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
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>CLIMATE WAR</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                {userData?.write && (
                  <Link to="/create">
                    <button className={styles.butSign}>Create</button>
                  </Link>
                )}

                <button onClick={onClickLogout} className={styles.butLogout}>
                  Logout
                </button>
              </>
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
      </Container>
    </div>
  )
}
