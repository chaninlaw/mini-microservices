import { useState } from 'react'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

const App = () => {
  const [fetch, setFetch] = useState(false)

  return (
    <div className='container'>
      <h1>Blog Post</h1>
      <PostCreate setFetch={setFetch} />
      <hr />
      <PostList rerender={fetch} />
    </div>
  )
}

export default App