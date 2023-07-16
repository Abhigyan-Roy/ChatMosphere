import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
const initial = {
  userName: "",
  email: "",
  password: ""
}
function Register() {
  const [user, setUser] = useState(initial);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/create', {
        userName: user.userName,
        email: user.email,
        password: user.password
      });
      toast.success('Successfully Created User !', {
        position: toast.POSITION.TOP_RIGHT
      });
      localStorage.setItem("userInformation", JSON.stringify(response.data.user));
      navigate('/home');
    } catch {
      toast.error('Problem in Signup!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  return (
    <div className="w-full h-[100vh] flex flex-row justify-center items-center bg-blue-100">
      <form className="w-[30vw] h-[40vh] bg-blue-200 flex flex-col justify-center items-center p-8" onSubmit={handleSubmit}>
        <input type="text" name="userName" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder="Your First Name" className="block w-full mb-2 p-2" />
        <input type="email" name="email" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder="Your Email" className="block w-full mb-2 p-2" />
        <input type="password" name="password" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} placeholder="Your password" className="block w-full mb-2 p-2" />
        <button className="bg-blue-500 w-full text-white p-2 rounded-md">Sign Up</button>
        <p>Already have an account?<Link to="/login">Login</Link></p>
      </form>

    </div>
  );
}

export default Register;

