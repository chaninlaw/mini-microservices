const express = require('express')
const axois = require('axios')

const app = express()
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axois
    .post('http://localhost:4000/events', event)
    .catch((err) => console.log(err))
  axois
    .post('http://localhost:4001/events', event)
    .catch((err) => console.log(err))
  axois
    .post('http://localhost:4002/events', event)
    .catch((err) => console.log(err))
  axois
    .post('http://localhost:4003/events', event)
    .catch((err) => console.log(err))

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
});

app.listen(4005, () => {
  console.log('Listening on port 4005')
})
