import { useState } from 'react'
import { useVideoRequest } from './hooks/useVideoRequest';
import './App.css'

const App = () => {
  const [username, setUsername] = useState("");

  const { data, isPending, fetchData } = useVideoRequest(username);

  return (
    <>
      <div>
        <input 
          type="text" 
          onChange={(event) => setUsername(event.target.value)} 
        />
        <button
          onClick={fetchData}>
            Fetch Videos
        </button>
        <p>{username}</p>
        <p>Pending? {isPending ? "Loading" : "Done" }</p>
        { data.length > 0 ?
          data.map(video => {
            return (
              <div key={video.id}>
                <p>
                  {video.url}
                </p>
                <p>
                  {video.title}
                </p>
              </div>
            )
          }) : null
        }
      </div>
    </>
  )
};

export default App;
