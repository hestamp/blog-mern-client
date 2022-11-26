import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import axios from '../../axios'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import styles from './Profile.module.scss'
import { Avatar } from '@mui/material'

import { selectIsAuth } from '../../redux/slices/auth'
import { useSelector } from 'react-redux'
const Profile = () => {
  const isAuth = useSelector(selectIsAuth)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    axios
      .get('/auth/me')
      .then(({ data }) => {
        setFullName(data.fullName)
        setEmail(data.email)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleSubmit = () => {}
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Full Name"
          value={fullName}
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
          className={styles.field}
          label="Password"
          fullWidth
        />
        <TextField
          type="password"
          className={styles.field}
          label="Repeat Password"
          fullWidth
        />
        <button type="submit" className={styles.butLogin}>
          Save
        </button>
      </form>
    </Paper>
  )
}

export default Profile
