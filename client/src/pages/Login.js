import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
const initial = {
  email: "",
  password: ""
}
function Login() {
  const [user, setUser] = useState(initial);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log('button wa clicked')
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/create-session', {
        email: user.email,
        password: user.password
      });
      console.log(response);
      toast.success('Successfully Logged in!', {
          position: toast.POSITION.TOP_RIGHT
        });
      localStorage.setItem("userInformation", JSON.stringify(response.data.user));
      navigate('/home');
    } catch (error) {
      toast.error('Problem in Login!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  return (
    <div className="w-full h-[100vh] flex flex-row justify-center items-center bg-blue-100">
      <form className="w-[30vw] h-[40vh] bg-blue-200 flex flex-col justify-center items-center p-8" onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder="Your email address" className="block w-full mb-2 p-2" />
        <input type="password" name="password" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder="Your password" className="block w-full mb-2 p-2" />
        <button className="bg-blue-500 w-full text-white p-2 rounded-md mb-4">Login</button>
        <h2>Don't have an account yet!<Link to="/">Register</Link> yourself</h2>
      </form>
    </div>
  );
}

export default Login;