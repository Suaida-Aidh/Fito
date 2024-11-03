import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

import Home from "./components/User/Home"
import TrainersList from './components/User/trainersList'
import UserSubscriptionList from './components/User/UserSubscriptionList'

import AdminDashboard from './components/Admin/AdminDashboard'
import SubscriptionMgmt from './components/Admin/SubscriptionMgmt'
import UserList from './components/Admin/UserList';

import TrainerDashboard from './components/Trainer/TrainerDashboard'

import AdminPrivateRoute from './components/Root/Admin/AdminPrivateRoute'
import TrainerMgmt from './components/Admin/TrainerMgmt'
import Example from './components/Admin/Example'
import TrainerDetail from './components/Admin/TrainerDetail'
import AddTrainer from './components/Admin/AddTrainer.JSX'

// import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trainersList' element={<TrainersList /> } />
        <Route path='/userSubscription' element={<UserSubscriptionList/> } />

        
        {/* <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/adminSubscription' element={<SubscriptionMgmt />} />
        <Route path='/usersList' element={<UserList/> } />

         */}


        <Route path='/adminDashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
        <Route path='/subscriptionMgmt' element={<AdminPrivateRoute><SubscriptionMgmt /></AdminPrivateRoute>} />
        <Route path='/usersList' element={<AdminPrivateRoute><UserList /></AdminPrivateRoute>} />
        <Route path='/trainerMgmt' element={<AdminPrivateRoute><TrainerMgmt /></AdminPrivateRoute>} />
        <Route path='/EXAMPLE' element={<AdminPrivateRoute><Example /></AdminPrivateRoute>} />
        <Route path='/trainers/:trainerId' element={<AdminPrivateRoute><TrainerDetail /></AdminPrivateRoute>} />
        <Route path='/trainers/add' element={<AdminPrivateRoute><AddTrainer /></AdminPrivateRoute>} />

        <Route path='/trainerDashboard' element={<TrainerDashboard />} />
        

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        
        
        
        
        {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/adminDashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/trainerDashboard" element={<PrivateRoute><TrainerDashboard /></PrivateRoute>} /> */}
       
      </Routes>
    </Router>
  )
}

export default App
