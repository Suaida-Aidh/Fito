import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/User/Home"
import Login from './components/Auth/Login'
import AdminDashboard from './components/Admin/AdminDashboard'
import Signup from './components/Auth/Signup'
import SubscriptionMgmt from './components/Admin/SubscriptionMgmt'
import UserSubscriptionList from './components/User/UserSubscriptionList'
import TrainersList from './components/User/trainersList'
import TrainerDashboard from './components/Trainer/TrainerDashboard'
// import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/trainerDashboard' element={<TrainerDashboard />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/adminSubscription' element={<SubscriptionMgmt />} />
        <Route path='/userSubscription' element={<UserSubscriptionList/> } />
        <Route path='/trainersList' element={<TrainersList /> } />


        {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/adminDashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/trainerDashboard" element={<PrivateRoute><TrainerDashboard /></PrivateRoute>} /> */}
       
      </Routes>
    </Router>
  )
}

export default App
