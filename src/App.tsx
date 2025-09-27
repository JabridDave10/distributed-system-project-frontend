import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('doctor')

  if (isLoggedIn) {
    return <Dashboard userType={userType} />
  }

  return <LoginPage />
}

export default App
