const express = require('express')
const axois = require('axios')

const app = express()
app.use(express.json())

app.post('/events', (req, res) => {
  const events = req.body

  axois
    .post('http://localhost:4000/events', events)
    .catch((err) => console.log(err))
  axois
    .post('http://localhost:4001/events', events)
    .catch((err) => console.log(err))
  axois
    .post('http://localhost:4002/events', events)
    .catch((err) => console.log(err))
  axois
    .post('http://localhost:4003/events', events)
    .catch((err) => console.log(err))

  res.send({ status: 'OK' })
})

app.listen(4005, () => {
  console.log('Listening on port 4005')
})
