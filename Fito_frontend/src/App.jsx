import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

import Home from "./components/User/Home"
import TrainersList from './components/User/TrainersList'
import UserSubscriptionList from './components/User/UserSubscriptionList'
import UserProfile from './components/User/UserProfile'

import AdminDashboard from './components/Admin/AdminDashboard'
import SubscriptionMgmt from './components/Admin/SubscriptionMgmt'
import UserList from './components/Admin/UserList';

import TrainerDashboard from './components/Trainer/TrainerDashboard'

import TrainerMgmt from './components/Admin/TrainerMgmt'
import Example from './components/Admin/Example'
import TrainerDetail from './components/Admin/TrainerDetail'
import AddTrainer from './components/Admin/AddTrainer.JSX'
import TrainerProfile from './components/Trainer/TrainerProfile'

import AdminPrivateRoute from './components/Root/Admin/AdminPrivateRoute'
// import UserPrivateRoute from './components/Root/User/UserPrivateRoute'
import TrainerPrivateRoute from './components/Root/Trainer/TrainerPrivateRouter'
import ProtectedRoute from './components/Root/Auth/ProtectedRoute'

import AccountActivation from './components/Auth/AccountActivation'
import Loader from './components/Utils/Loader'
function App() {

  return (
    <Router>
      <Routes>
      <Route element={<AdminPrivateRoute />}>
            <Route path="adminDashboard" element={<AdminDashboard />} />
            <Route path="subscriptionMgmt" element={<SubscriptionMgmt />} />
            <Route path="usersList" element={<UserList />} />
            <Route path="trainerMgmt" element={<TrainerMgmt />} />
            <Route path="EXAMPLE" element={<Example />} />
            <Route path="trainers/:trainerId" element={<TrainerDetail />} />
            <Route path="trainers/add" element={<AddTrainer />} />
        </Route>

        <Route path="activate" element={<AccountActivation />} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        <Route path="/trainersList" element={<TrainersList />} />
        <Route path="/userSubscription" element={<UserSubscriptionList />} />
        <Route path="/userProfile" element={<UserProfile />} />

        <Route path="/trainerDashboard" element={<TrainerPrivateRoute><TrainerDashboard /></TrainerPrivateRoute>} />
        <Route path="/trainerProfile" element={<TrainerPrivateRoute><TrainerProfile /></TrainerPrivateRoute>} />

        
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        

        <Route path='/loader' element={<Loader />} />

        
      </Routes>
    </Router>
  )
}

export default App
