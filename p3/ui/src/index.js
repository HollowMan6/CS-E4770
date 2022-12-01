import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
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
  useEffect(() => {
    fetchMoreData()
  }, [])

  const style = {
    borderBottomLeftRadius: "15px 255px",
    borderBottomRightRadius: "225px 15px", 
    borderTopLeftRadius: "255px 15px",
    borderTopRightRadius: "15px 225px",
    border: "2px solid #41403e",
    borderColor: "var(--primary)",
    margin: 6,
    padding: 8
  };

  const [state, setState] = useState([]);
  const [message, setMessage] = useState('')
  const matchMsg = useMatch('/:id');
  const type = reply ? 'reply' : 'message'

  const setNewState = (newState) => {
    setState([...newState].sort((a, b) => b.time - a.time))
  }

  const fetchMoreData = () => {
    let max_id = 2147483646;
    if (state.length > 0) {
      max_id = state[state.length - 1].id
    }
    if (matchMsg) {
      const msgid = Number(matchMsg.params.id)
      if (msgid) {
        fetch(`/api/?id=${max_id}&messageid=${msgid}`).then((response) => {
          response.json().then((data) => {
            setNewState(state.concat(data))
          })
        });
      }
    } else {
      fetch(`/api/?id=${max_id}`).then((response) => {
        response.json().then((data) => {
          setNewState(state.concat(data))
        })
      });
    }
  };

  const sendMessage = () => {
    if (message) {
      const data = {
        usertoken: window.localStorage.getItem('user'),
        content: message
      }

      if (matchMsg) {
        const msgid = Number(matchMsg.params.id)
        if (msgid) {
          data.messageid = msgid
        } else {
          setMessage('')
          return
        }
      }

      fetch('/api', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then((response) => {
        response.json().then((data) => {
          setNewState(state.concat(data))
        })
      });
      setMessage('')
    }
  }

  const handleInputMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const vote = async(id, toVote) => {
    const toModify = state.find((item) => item.id === id)
    let voted = {
      ...toModify,
      point: toModify.point + 1
    };
    let vote = "up";
    if (!toVote) {
      voted = {
        ...toModify,
        point: toModify.point - 1
      }
      vote = "down";
    }

    await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({id, vote, msg: type})
    })
    setNewState(state.map((e) => e.id === id ? voted : e))
  }

  return (
    <>
      <div align="center">
        <textarea rows="1" cols="100" placeholder="Type your message here..." onChange={handleInputMessageChange} value={message}></textarea><br />
        <button onClick={sendMessage}>Send</button>
      </div>
      <InfiniteScroll
        dataLength={state.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {state.map(({id, content, time, point}, i) => (
            <div style={style} key={i}>
              <Content index={id} content={content} reply={reply}></Content>
              <br/>
              <small>{new Date(Number(time)).toString()}</small><br/>
              <button onClick={()=>vote(id, true)}>
                ⬆️
              </button>
              {point}
              <button onClick={()=>vote(id, false)}>
                ⬇️
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
