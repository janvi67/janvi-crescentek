import logo from './logo.svg';
import './App.css';

import Register from './components/Register';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
import Protected from './components/Protected';
import AuthGuard from './components/AuthGuard';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import UserData from './components/UserData';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';


const App=()=> {
  return (
    <div className="App">
    
    <Router>
   
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
     <Route path='/UserData' element={<UserData/>}/>
     <Route path='/Api' element={<AuthGuard/>}/>
     <Route path='/useReducer' element={<useReducer/>}/>
     
     <Route path='/EmployeeList' element={<EmployeeList/>}/>
     <Route path='/AddEmployee' element={<AddEmployee/>}/>
     <Route path='/EditEmployee/:id' element={<EditEmployee/>}/>
     
      </Routes>
      
    </Router>
    
    </div>
  );
}

export default App;
