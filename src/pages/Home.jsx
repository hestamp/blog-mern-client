import React, { useEffect } from 'react'
import { MdCreate } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import { Post } from '../components/Post'
import { fetchPosts } from '../redux/slices/posts'
import styles from './Home.module.scss'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)

  const { posts } = useSelector((state) => state.posts)

  const isPostLoading = posts.status === 'loading'

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts())
    }
  }, [])
  return (
    <>
      <div className={styles.butLast}>
        <h2 style={{ margin: 0 }}>Last Posts</h2>
      </div>

      {userData?.write && (
        <div className={styles.butCreate}>
          <Link to="/create">
            <MdCreate className={styles.createIcon} />
          </Link>
        </div>
      )}

      <Grid container spacing={4}>
        <Grid xs={12} item>
          {isPostLoading
            ? [...Array(5)].map((one, id) => <Post key={id} isLoading={true} />)
            : posts.items.map((one, id) => (
                <Post
                  id={one._id}
                  key={id}
                  title={one.title}
                  imageUrl={
                    one.imageUrl
                      ? `${process.env.REACT_APP_API_URL}${one.imageUrl}`
                      : ''
                  }
                  user={one?.user || 'noUser'}
                  createdAt={one.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-')}
                  viewsCount={one.viewsCount}
                  isEditable={userData?._id === one.user?._id}
                />
              ))}
        </Grid>
      </Grid>
    </>
  )
}
