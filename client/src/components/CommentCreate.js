import { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ postId, setFetch }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content,
      })
      setContent('')
      setFetch(prev => !prev)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate
