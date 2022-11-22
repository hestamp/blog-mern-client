import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
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
                    <Button variant="contained">Create post</Button>
                  </Link>
                )}

                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign in</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
