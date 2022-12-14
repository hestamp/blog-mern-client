import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { useForm } from 'react-hook-form'
import styles from './Login.module.scss'
import { fetchLogin, selectIsAuth } from '../../redux/slices/auth'

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values))

    if (!data.payload) {
      return alert('Cant auth')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          type="email"
          helperText={errors.email?.message}
          {...register('email', { required: 'Set your email' })}
          fullWidth
        />
        <TextField
          helperText={errors.password?.message}
          {...register('password', { required: 'Set your password' })}
          type="password"
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          fullWidth
        />
        <button type="submit" className={styles.butLogin}>
          Login
        </button>
      </form>
    </Paper>
  )
}
