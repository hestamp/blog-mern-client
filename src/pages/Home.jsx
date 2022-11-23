import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

import { Post } from '../components/Post'
// import { TagsBlock } from '../components/TagsBlock'
// import { CommentsBlock } from '../components/CommentsBlock'
import { fetchPosts } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)

  const { posts, tags } = useSelector((state) => state.posts)

  const isPostLoading = posts.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])
  return (
    <>
      {/* <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs> */}
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
                    one.imageUrl ? `${process.env.REACT_APP_API_URL}${one.imageUrl}` : ''
                  }
                  user={one.user}
                  createdAt={one.createdAt}
                  viewsCount={one.viewsCount}
                  isEditable={userData?._id === one.user._id}
                />
              ))}
        </Grid>
        {/* <Grid xs={4} item>
          <TagsBlock
            items={['react', 'typescript', 'заметки']}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  )
}
