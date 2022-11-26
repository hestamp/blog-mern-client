import React, { useCallback, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'
import axios from '../../axios'
import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useEffect } from 'react'

export const AddPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.data)
  const isEditing = Boolean(id)
  const [text, setText] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(``)
  const [title, setTitle] = useState('')
  const inputFileRef = useRef(null)
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error)
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const fields = {
        title,
        imageUrl,
        text,
      }
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)

      const _id = isEditing ? id : data._id

      navigate(`/posts/${_id}`)
    } catch (error) {
      console.warn(error)
    }
  }

  const onChange = useCallback((value) => {
    setText(value)
  }, [])

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setText(data.text)
          setImageUrl(data.imageUrl)
        })
        .catch((error) => console.log(error))
    }
  }, [])

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  if (!userData?.write) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className={styles.heading}>
        <h3>Create Post</h3>
      </div>
      <Paper style={{ padding: 30 }}>
        <Button
          className={styles.uploadMe}
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"
        >
          Upload preview
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Delete
            </Button>
            <img
              className={styles.image}
              src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}

        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Heading..."
          fullWidth
        />

        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? 'Save' : 'Publish'}
          </Button>
          <a href="/">
            <Button size="large">Cancel</Button>
          </a>
        </div>
      </Paper>
      <div className={styles.empty}></div>
    </>
  )
}
