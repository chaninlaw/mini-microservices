const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

const eventBusURL = 'http://event-bus-srv:4005'

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    await axios.post(`${eventBusURL}/events`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    })
  }
  res.send({})
})

app.listen(4003, () => {
  console.log('Listening on port 4003')
})
