import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/User/Home"
import Login from './components/Auth/Login'
import AdminDashboard from './components/Admin/AdminDashboard'
import Signup from './components/Auth/signup'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </Router>
  )
}

export default App
