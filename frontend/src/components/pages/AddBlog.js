import React, {useState} from 'react';
import {Box, Typography,InputLabel, TextField,Button } from "@mui/material";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useStyles} from "./utils"
const AddBlog = () => {
    const [inputs, setInputs]= useState({
        title:"",
        description:"",
        image:""
    });
    const navigate=useNavigate();
    const labelStyles={mb:1, mt: 2, FontSize:"24px", fontWeight:"bold"}
    const classes=useStyles();
    const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
      const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    // @ts-ignore
    const data = await res.data;
    return data;
  };
   const handleSubmit = (e) => {
    e.preventDefault();
     sendRequest().then((data) => console.log(data)).then(() => navigate("/blogs"));
    console.log(inputs);
    }
    return (
        <div>
        <form onSubmit={handleSubmit}>
        <Box
         border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
          >
         <Typography 
          fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
            >
         Post your Blog
         </Typography>
         <InputLabel sx={labelStyles}>Title</InputLabel>
         <TextField 
          className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            // @ts-ignore
            margin="auto"
            variant="outlined"
            />
         <InputLabel sx={labelStyles} >Description</InputLabel>
         <TextField 
            name="description"
             onChange={handleChange}
            value={inputs.description}
          className={classes.font}
            // @ts-ignore
            margin="auto"
            variant="outlined"
            />
         <InputLabel sx={labelStyles}>ImageURL</InputLabel>
         <TextField 
         name="image"
          onChange={handleChange}
            value={inputs.image}
          className={classes.font}
            // @ts-ignore
            margin="auto"
            variant="outlined"
            />
            <Button type="submit"
               sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning">Submit</Button>
            
        </Box>
        </form>
        </div>
    );
}

export default AddBlog;
