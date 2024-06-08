import { useState } from 'react'
import styled from 'styled-components'
import './App.css'
import {CalendarPage} from './Calendar/calendarView'
const Description = styled.p `
  font-size: 20px;
  color: #888;
  background: red;
`
function Logo(props) {
  const style = {
    fontSize: '10px',
    color: props.color
  }
  return (
    <div>
      <h1 style={style}>{props.title}</h1>
    </div>
  )
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Logo title = '변경을 확인하겠습니다.' color="black"/>
      <Logo title = '잘 보이시나요?' color="blue"/>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Description>
        Click on the Vite and React logos to learn more
      </Description>
      <CalendarPage/>
    </>
  )
}

export default App
