import { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = ({rerender}) => {
  const [posts, setPosts] = useState({})
  const [fetch, setFetch] = useState(false)

  const fetchPost = async () => {
    const res = await axios.get('http://localhost:4002/posts')
    setPosts(res.data)
  }

  useEffect(() => {
    fetchPost()
  }, [fetch, rerender])

  const renderedPost = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} setFetch={setFetch} />
        </div>
      </div>
    )
  })

  return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedPost}</div>
}

export default PostList
