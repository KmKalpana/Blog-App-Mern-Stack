import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './utils'
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://blog-backend-2.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err))
    // @ts-ignore
    const data = await res.data
    return data
  }
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'))
  }
  return (
    <div>
      {' '}
      <Card
        sx={{
          width: '40%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover': {
            boxShadow: '10px 10px 20px #ccc',
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: 'red' }}
              aria-label="recipe"
            >
              {userName}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="320" image={imageURL} alt={title} />

        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <h2>{userName}</h2> {': '} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog
