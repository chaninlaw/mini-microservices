const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const eventBusURL = 'http://event-bus-srv:4005'

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({ id, content, status: 'pending' })

  commentsByPostId[req.params.id] = comments

  await axios.post(`${eventBusURL}/events`, {
    type: 'CommentCreated',
    data: {
      id,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  console.log("Received Events", req.body.type)
  const { type, data } = req.body
  if (type === 'CommentModerated') {
    const {id, content, postId, status} = data
    const comments = commentsByPostId[postId]

    const comment = comments.find((comment) => comment.id === id)
    comment.status = status

    await axios.post(`${eventBusURL}/events`, {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        content,
        postId
      }
    })
  }

  res.send({})
})

app.listen(4001, () => {
  console.log('Listening in port 4001')
})
