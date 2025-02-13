import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Appointment from './Appointment.jsx'
import AppointmentSchedule from './AppointmentSchedule.jsx'
import Login from './Login.jsx'

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: null,
    id: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...user,
        ...parsedUser,
        isLoggedIn: true,
      });
    } else {
      setUser({
        isLoggedIn: false,
        role: null,
        id: null,
      });
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "schedule", element: <AppointmentSchedule /> },
        { path: "appointment", element: <Appointment /> },
        { path: "login", element: <Login /> }
      ]
    }
  ])
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
