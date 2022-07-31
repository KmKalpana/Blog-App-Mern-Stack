import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/authentication/Signup';
import Homepage from './HomePage';
import Blogs from './components/pages/Blogs'
import UserBlog from './components/pages/UserBlog';
import BlogDetail from './components/pages/BlogDetail';
import AddBlog from './components/pages/AddBlog';
import {useSelector} from "react-redux";
function App() {
  // @ts-ignore
  const isLoggedIn= useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <React.Fragment>
    <Homepage />
    <main>
     <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Signup/>} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlog />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
            </>
          )}
        </Routes>
    </main>
    </React.Fragment>
  );
}

export default App;
