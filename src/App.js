// import logo from './logo.svg';
import './App.css';
import "./Assets/bootstrap/css/bootstrap.min.css";
import "./Assets/bootstrap/css/bootstrap-theme.min.css";
import "./Assets/fonts/font-awesome/css/font-awesome.min.css";
import Login from './Components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
// import Images from './Components/Images';
// import "./Assets/css/newlogin.css";


function App() {

  const ApiPort = "http://localhost:5738";

  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Login apiPort={ApiPort}/>} />
           <Route path='/dashboard' element={<Dashboard apiPort={ApiPort}/>} />
         </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
