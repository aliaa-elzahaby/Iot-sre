import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  // Colors for cards
  const colors = ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"];

  // Fetch posts from backend
  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts');
      const data = await response.json();
      if (data) setPosts(data);
      else console.error('No posts: ', data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h2>Posts</h2>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post, idx) => (
            <div
              key={idx}
              className="post-card"
              style={{ borderTop: `5px solid ${colors[idx % colors.length]}` }}
            >
              <h3>{post.name}</h3>
              <p>{post.specialization}</p>
              <p>{post.university}</p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
}

export default App;
