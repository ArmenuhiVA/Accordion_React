import { useState, useEffect } from 'react'
import Accordion from "./components/Accordion";
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        if (!ignore) {
          
          setBio(json);

        }
      })
      .catch(error => console.error('Error fetching data:', error));
    return () => {
      ignore = true;
    };
    
  }, []);

  return (

    <div className="App">
      <h1>Shown first five posts</h1>
      {bio.map((post, i) => 
           <Accordion
           key = {i}
           id = {post.id}
           title={post.title}
           content={post.body}
         />
      )}
    </div>
  )
}




export default App

