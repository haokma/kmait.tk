import React, { useEffect, useState } from 'react';
import blogApi from '../../apis/blogApi';
import { categoriesApi } from '../../apis/categoriesApi';
import Footer from '../Footer';
import Header from '../Header';


const LayoutComponent = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    categoriesApi.getCategories()
      .then(res => {
        setCategories(res.data.category)
      })
  }, [])
  useEffect(() => {
    blogApi.getBlogs(3)
      .then((res) => {
        setBlogs(res.data.blogs)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <>
      <Header categories={categories} />
      {children}
      <Footer blogs={blogs} />
    </>
  )
}

export default LayoutComponent
