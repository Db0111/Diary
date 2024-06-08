// import { useState } from 'react'
// import styled from 'styled-components'
import './App.css'
import { Calendar } from './Calendar/CalendarFunction'
import {CalendarPage} from './Calendar/calendarView'
import { Daycell } from './daycell'


function App() {
  return (
    <>
      <CalendarPage/>
      <Daycell/>
      <prevMonth/>
      <gotoToday/>
      <nextMonth/>
      <Calendar/>
    </>
    
  )
}

export default App
