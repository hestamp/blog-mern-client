import React, { useEffect, useState } from 'react'
import { selectIsAuth } from '../../redux/slices/auth'
import { useSelector } from 'react-redux'

import styles from './Profile.module.scss'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'

const Profile = () => {
  const isAuth = useSelector(selectIsAuth)

  const userData = useSelector((state) => state.auth.data)
  const [fullName, setFullName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isAuth) {
      setFullName(userData.fullName)
      setEmail(userData.email)
      setAvatar(userData?.avatarUrl)
    }
  }, [])

  const handleSubmit = () => {}
  return (
    <div classes={{ root: styles.groot }}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className={styles.avatar}>
            {avatar ? (
              <img
                className={styles.avatarLog}
                src={avatar || '/noavatar.png'}
                alt={fullName}
              />
            ) : (
              <img style={{ width: 100, height: 100 }} src="noavatar.png" />
            )}
          </div>
          <TextField
            className={styles.field}
            label="Full Name"
            value={fullName}
            disabled
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            className={styles.field}
            label="E-Mail"
            value={email}
            helperText="Text Administrator to change"
            type="email"
            disabled
            fullWidth
          />
          <TextField
            type="password"
            disabled
            className={styles.field}
            label="Password"
            fullWidth
          />
          <TextField
            type="password"
            disabled
            className={styles.field}
            label="Repeat Password"
            fullWidth
          />
          <button disabled={true} type="submit" className={styles.butLogin}>
            Save
          </button>
        </form>
      </Paper>
    </div>
  )
}

export default Profile
