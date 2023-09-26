import { useState } from 'react'
import axios from 'axios'

const PostCreate = ({setFetch}) => {
  const [title, setTitle] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://posts.com/posts/create', { title })
    setTitle('')
    setFetch(prev => !prev)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  )
}

export default PostCreate
