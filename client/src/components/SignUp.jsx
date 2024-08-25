import React, { useState } from 'react'
import axios from 'axios'; 
import leftsvg from "../assets/left.svg"
import rightsvg from "../assets/right.svg"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {   
      const response = await axios.post('http://localhost:8000/user/signup', {
        email,
        password
      });
      if (response.data) {
        alert("SignUp Successful");
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response && error.response.data) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Error: Something went wrong. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <div>
        <h1 className="text-green-600 font-semibold text-5xl flex justify-center mt-32">Your work people are here</h1>
        <div className="flex flex-row mt-14 justify-between">
          <img src={leftsvg} className="ml-7"/>
        <div className="flex flex-col justify-center items-center">
            {/* text */}
            <p className="text-xs">Create an account or sign in. By continuing, you agree to</p>
            <p className="text-xs">our <span className="text-green-600 hover:cursor-pointer">Terms of Use</span> and <span className="text-green-600 hover:cursor-pointer">Privacy Policy.</span></p>
            <div className="mt-4 flex flex-col space-y-2">
              <p className="border-solid border-[1px] border-black w-[325px] py-2 text-center flex flex-row cursor-pointer"><img src="google.png" className='text-left px-1' width={36}/><span className="ml-10">continue with google</span></p>
              <p className="border-solid border-[1px] border-black w-[325px] py-2 text-center flex flex-row cursor-pointer"><img src="facebook.png" className='text-left px-1' width={36}/><span className="ml-10">continue with facebook</span></p>
              <p className="border-solid border-[1px] border-black w-[325px] py-2 text-center flex flex-row cursor-pointer"><img src="apple-logo.png" className='text-left px-1' width={36}/><span className="ml-10">continue with apple</span></p>
              <p className="text-center">OR</p>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                  <TextField
                    id="outlined-password-input"
                    label="Enter your mail"
                    type="email"
                    value={email}
                    autoComplete="current-password"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    required
                  />
              </div>
              <div className="flex justify-center bg-green-600 text-white py-2 rounded-md"><input type="submit" value="signup" /></div>
            </Box>
        </div>
        <img src={rightsvg} className="mr-7" />
        </div>
    </div>
  );
}

export default SignUp;