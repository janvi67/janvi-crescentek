import logo from './logo.svg';
import './App.css';

import Register from './components/Register';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
import Protected from './components/Protected';
import Api from './components/Api';
import AuthGuard from './components/AuthGuard';



function App() {
  return (
    <div className="App">
    
    <Router>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
     <Route path='Api' element={<Api/>}/>
     <Route path='Api' element={<AuthGuard/>}/>
     
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
