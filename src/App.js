import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'

import { Header } from './components'
import { Home, FullPost, Registration, AddPost, Login } from './pages'
import { useEffect } from 'react'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import { Footer } from './components/Footer'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/posts" element={<Home />} />

          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/create" element={<AddPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
