// @ts-nocheck
import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
const HomePage=()=>
{
  const dispath=useDispatch();
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  const [value, setValue]=useState();
 return (
  <AppBar sx={{
    backgroundColor:"#3a9db4",
      position:"sticky"
  }}>
  <Toolbar>
  <Typography variant="h4">
     Blog App
  </Typography>
 { isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
  <Tabs  textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
  <Tab 
  LinkComponent={Link} 
  to="/blogs"
   label="AllBlogs" />
  <Tab 
 LinkComponent={Link} 
  to="/myblogs" 
  label="My Blogs" />
  <Tab
  LinkComponent={Link} 
  to="/blogs/add" 
  label="Add Blogs" />
  </Tabs>
  </Box>
 }
  <Box display="flex" marginLeft="auto">
   {!isLoggedIn && <>
   <Button color="warning"  variant="contained"  sx={{ margin: 1, borderRadius: 10 }}
    LinkComponent={Link} 
  to="/auth">Login</Button>
    <Button color="warning"  variant="contained"  sx={{ margin: 1, borderRadius: 10 }}
    LinkComponent={Link} 
  to="/auth" >Signup</Button>
  </>
   }
    {isLoggedIn && <Button color="warning"  variant="contained"  sx={{ margin: 1, borderRadius: 10 }}
       onClick={() => dispath(authActions.logout())}
     LinkComponent={Link} 
  to="/auth">Logout </Button>
    }
  </Box>
  </Toolbar>
  </AppBar>
 )
}
export default HomePage;