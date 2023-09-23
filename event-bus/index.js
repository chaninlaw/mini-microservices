const express = require('express')
const axois = require('axios')

const app = express()
app.use(express.json())

const postsURL = 'http://posts-clusterip-srv:4000'

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axois
    .post(`${postsURL}/events`, event)
    .catch((err) => console.log(err))
  // axois
  //   .post('http://localhost:4001/events', event)
  //   .catch((err) => console.log(err))
  // axois
  //   .post('http://localhost:4002/events', event)
  //   .catch((err) => console.log(err))
  // axois
  //   .post('http://localhost:4003/events', event)
  //   .catch((err) => console.log(err))

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
});

app.listen(4005, () => {
  console.log('Listening on port 4005')
})
