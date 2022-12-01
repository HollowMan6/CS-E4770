import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component";

const makeid = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const generateArray = (length) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array.push({content: makeid(16), time: Date.now(), point: 0})
  }
  return array
}

const Content = ({index, content, reply}) => {
  if (reply) {
    return (
      <span>{content}</span>
    )
  } else {
    return (
      <Link to={`/${index}`}>{content}</Link>
    )
  }
}

const List = ({reply}) => {
  const style = {
    height: 90,
    border: "1px solid black",
    margin: 6,
    padding: 8
  };

  const [state, setState] = useState(generateArray(10));
  const [message, setMessage] = useState('')

  const setNewState = (newState) => {
    setState([...newState].sort((a, b) => b.time - a.time))
  }

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setNewState(state.concat(generateArray(20)));
    }, 1500);
  };

  const sendMessage = () => {
    setNewState(state.concat([{content: message, time: Date.now(), point: 0}]));
    setMessage('')
  }

  const handleInputMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const vote = (id) => {
    const voted = {
      ...state[id],
      point: state[id].point + 1
    }
    setNewState(state.map((e, index) => index === id ? voted : e))
  }

  const veto = (id) => {
    const vetoed = {
      ...state[id],
      point: state[id].point - 1
    }
    setNewState(state.map((e, index) => index === id ? vetoed : e))
  }

  return (
    <>
      <div align="center">
        <textarea rows="1" cols="100" onChange={handleInputMessageChange} value={message}></textarea><br />
        <button onClick={sendMessage}>Send</button>
      </div>
      <InfiniteScroll
        dataLength={state.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {state.map(({content, time, point}, index) => (
            <div style={style} key={index}>
              <Content index={index} content={content} reply={reply}></Content>
              <br/>
              <small>{new Date(time).toString()}</small><br/>
              <button onClick={()=>vote(index)}>
                vote
              </button>
              {point}
              <button onClick={()=>veto(index)}>
                veto
              </button>
            </div>
        ))}
      </InfiniteScroll>
    </>
  )
}

const Reply = () => {
  const navigate = useNavigate()

  return (
    <>
      <p align="center">
        <button onClick={() => navigate('/')}>Back</button>
      </p>
      <List reply={true}/>
    </>
  )
}

const App = () => {
  useEffect(() => {
    const userToken = window.localStorage.getItem('user')
    if (!userToken) {
      window.localStorage.setItem('user', makeid(32))
    }
  }, [])

  return (
    <div>
      <Router>
        <h3 align="center">Message List</h3>
        <Routes>
          <Route path="/" element={<List reply={false}/>} />
          <Route path="/:id" element={<Reply/>} />
        </Routes>
      </Router>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
