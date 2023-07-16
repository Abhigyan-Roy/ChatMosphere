import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/chat.css'
import { useNavigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import ChatInput from './ChatInput';

function Chats() {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    if (!localStorage.getItem("userInformation")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("userInformation")));
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedUser) {
      fetchChats();
    }
  }, [selectedUser,arrivalMessage]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("add-user", currentUser._id);
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (arrivalMessage) {
      setChats((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chats]);

  const fetchUsers = async () => {
    try {
      const id = currentUser._id;
      const response = await axios.get(`http://localhost:4000/getusers/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch users. Please try again.');
    }
  };

  const fetchChats = async () => {
    try {
      const sid = currentUser._id;
      const rid = selectedUser._id;
      const response = await axios.get(`http://localhost:4000/getmessage`, {
        params: {
          from: sid,
          to: rid
        }
      });
      setChats(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch messages. Please try again.');
    }
  };

  const handleClick = async () => {
    try {
      const id = currentUser._id;
      const response = await axios.get(`http://localhost:4000/sign-out/${id}`);
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem('userInformation');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMsg = async (msg) => {
    try {
      const sid = currentUser._id;
      const rid = selectedUser._id;
      socket.current.emit("send-msg", {
        to: rid,
        from: sid,
        msg,
      });
      const response = await axios.post(`http://localhost:4000/sendmessage`, {
        message: msg,
        from: sid,
        to: rid
      });
      const newMessage = { fromSelf: true, message: msg };
      setChats((prevChats) => [...prevChats, newMessage]);
    } catch (error) {
      console.log(error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='w-full flex items-center justify-center h-[100vh]'>
      <div className="w-[65vw] h-[75vh] bg-gray-800 flex flex-row items-center justify-center">
        <div className='w-[35%] bg-violet-800 h-[100%]'>
          <div className='h-[12%] w-[100%] bg-violet-500 text-white flex flex-row items-center justify-between'>
            <div className='mx-2'>{currentUser ? currentUser.userName : 'Loading...'}</div>
            <button className='mx-2' onClick={handleClick}>Logout</button>
          </div>
          <div className='contact h-[88%]'>
            {users.map((user) => (
              <div
                className={`bg-gray-100 mx-2 my-4 p-4 ${selectedUser && selectedUser._id === user._id ? 'selected' : ''}`}
                key={user._id} // Assign a unique key to each user
                onClick={() => handleUserClick(user)}
              >
                {user.userName}
              </div>
            ))}
          </div>
        </div>
        <div className='w-[65%] h-[100%] flex flex-col'>
          <div className='h-[12%] w-[100%] bg-gray-400 flex flex-row items-center justify-between'>
            <div className='mx-2'>{selectedUser ? selectedUser.userName : 'Loading...'}</div>
          </div>
          <div className='h-[78%] w-[100%] bg-black flex flex-col overflow-y-auto'>
            <div ref={scrollRef} key={uuidv4()}>
              {chats.map((chat, index) => (
                <div
                  className={`message ${chat.fromSelf ? 'sended' : 'received'} w-40 m-2 p-2 text-white flex flex-col ${chat.fromSelf ? 'ml-auto' : ''}`}
                  key={index}
                >
                  <div>
                    <p>{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
        </div>
      </div>
    </div>
  );
}

export default Chats;
