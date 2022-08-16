import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store";
const Auth = () => {
  const navigate=useNavigate();
  const dispath= useDispatch();
  const [isSignup,setIsSignup]=useState(false);
  const [inputs, setInputs]=useState({name:"",
     email:"",
    password:""});
  const naviagte = useNavigate();
  const handleChange=(e)=>{
      setInputs((prevState)=>({
        ...prevState,
          [e.target.name]:e.target.value,
      })
      );
  }
  const sendRequest = async (type="login")=>{
    const res = await axios
      .post(`https://blog-backend-2.herokuapp.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    // @ts-ignore
    const data = await res.data;
    console.log(data);
    return data;
  }
 const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  if (isSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(() => dispath(authActions.login())).then(()=>naviagte("/blogs",{replace:true}));
    } else {
      
     sendRequest("login").then((data)=>localStorage.setItem("userId",data.user._id)).then(() => dispath(authActions.login())).then(()=>navigate("/blogs",{replace:true}));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={14}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
            name="name"
            value={inputs.name}
              type={"name"}
               onChange={handleChange}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField
          name="email"
          value={inputs.email}
          onChange={handleChange}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
           name="password"
           value={inputs.password}
           onChange={handleChange}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;