import React, {useState} from 'react';
import loginimg from "../../../public/img/login/loginimg.svg"
import { Link, useNavigate } from "react-router-dom";
import { signUp } from '../../redux/actions/actions';
import logo from "../../../public/img/logo.svg";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';


export function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const data = await dispatch(signUp({username, mail, password}));
    
    if (data.success) {
      toast("User registered successfully!");
      navigate("/");
    } else {
      toast(data.error);
    }
  }

  return (
    <div className="flex flex-row justify-center bg-white">
      <div className=" top-0">
       <img src={logo}/> 
      </div>
      <div className="flex flex-row justify-center items-center mt-8">
        <div className="w-[341px] bg-white mr-24">
          <p className=" text-[#280559] text-[40px] font-bold mb-2">Sign up</p>
          <p className=" text-[#667085] text-[16px] font-normal mb-14">Please fill your detail to access your account.</p>
          <p className=" text-[#344054] text-[16px] font-normal mb-2">Name</p>
          <Input type="text" label="Name" size="lg" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <p className=" text-[#344054] text-[16px] font-normal mt-5 mb-2">Email</p>
          <Input type="email" label="Email" size="lg" value={mail} onChange={(e) => setMail(e.target.value)}/>
          <p className=" text-[#344054] text-[16px] font-normal mt-5 mb-2">Password</p>
          <Input type="password" label="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <Button className="my-5" variant="gradient" fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          
          <Link to="/auth/sign-in">
            <div className="w-full flex flex-row justify-center my-3">
              <p className=" text-sm text-[#344054] font-medium mx-2">Already have an account? <span className=" text-[#0263FF]"> Sign in </span> </p>  
            </div>
          </Link>
        </div>
      </div>
      <div className="w-[1058px]">
        <img src={loginimg}/>
      </div>
      
    </div>
  );
}

export default SignUp;