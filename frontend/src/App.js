import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/authentication/Signup'
import AddBlog from './components/pages/AddBlog'
import BlogDetail from './components/pages/BlogDetail'
import Blogs from './components/pages/Blogs'
import UserBlog from './components/pages/UserBlog'
import Homepage from './HomePage'
function App() {
  // @ts-ignore
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <React.Fragment>
      <Homepage />
      <main>
        <HashRouter>
          <Routes>
            {!isLoggedIn ? (
              <Route path="/auth" element={<Signup />} />
            ) : (
              <>
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/add" element={<AddBlog />} />
                <Route path="/myBlogs" element={<UserBlog />} />
                <Route path="/myBlogs/:id" element={<BlogDetail />} />{' '}
              </>
            )}
          </Routes>
        </HashRouter>
      </main>
    </React.Fragment>
  )
}

export default App
