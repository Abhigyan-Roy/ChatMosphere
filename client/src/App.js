import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Chats />}/>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;


