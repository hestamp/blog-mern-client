import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'

import styles from './Post.module.scss'
import { UserInfo } from '../UserInfo'
import { PostSkeleton } from './Skeleton'

import { fetchRemovePost } from '../../redux/slices/posts'

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove this post?')) {
      dispatch(fetchRemovePost(id))
      return <Navigate to="/" />
    }
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <Link to={`/posts/${id}`}>
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={title}
          />
        </Link>
      )}
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
        </div>
        <div className={styles.authorVies}>
          <UserInfo {...user} additionalText={createdAt} />
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
        {children && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  )
}
