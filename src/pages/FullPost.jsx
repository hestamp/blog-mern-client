import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../components/Post'

import ReactMarkdown from 'react-markdown'
import axios from '../axios'
// import { Index } from '../components/AddComment'
// import { CommentsBlock } from '../components/CommentsBlock'

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.warn(error)
        alert(`Error! Can't get post!`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
            : ''
        }
        user={data.user}
        createdAt={data.createdAt.split('T')[0].split('-').reverse().join('-')}
        viewsCount={data.viewsCount}
        isFullPost
        isEditable
      >
        <ReactMarkdown children={data.text} />
      </Post>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: '1',
              avatarUrl: '2',
            },
            text: '3',
          },
          {
            user: {
              fullName: '1',
              avatarUrl: '2',
            },
            text: '3',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock> */}
    </>
  )
}
