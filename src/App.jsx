import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Appointment from './Appointment.jsx'
import AppointmentSchedule from './AppointmentSchedule.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      children: [
        {path: "schedule", element: <AppointmentSchedule/>},
        {path: "appointment", element: <Appointment/>},
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
