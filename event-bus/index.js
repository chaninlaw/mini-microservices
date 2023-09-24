const express = require('express')
const axois = require('axios')

const app = express()
app.use(express.json())

const postsURL = 'http://posts-clusterip-srv:4000'
const commentsURL = 'http://comments-srv:4001'
const queryURL = 'http://query-srv:4002'
const moderationURL = 'http://moderation-srv:4003'
const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axois.post(`${postsURL}/events`, event).catch((err) => console.log(err))
  axois.post(`${commentsURL}/events`, event).catch((err) => console.log(err))
  axois.post(`${queryURL}/events`, event).catch((err) => console.log(err))
  axois.post(`${moderationURL}/events`, event).catch((err) => console.log(err))

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Listening on port 4005')
})
