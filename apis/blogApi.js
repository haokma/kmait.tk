import { URL_API } from "../constants"
import axiosClient from "./axiosClient"



const blogApi = {
  getBlogs: (fetchInfo) => {
    const url = `${URL_API}/blog?limit=${fetchInfo.limit}&page=${fetchInfo.page}`
    return axiosClient.get(url)
  },
  getBlog: (slug) => {
    const url = `${URL_API}/blog/${slug}`
    return axiosClient.get(url)
  },
  getBlogCategory: (fetchInfo) => {
    const url = `${URL_API}/blog/category/${fetchInfo.slug}?limit=${fetchInfo.limit}&page=${fetchInfo.page}`
    return axiosClient.get(url)
  }
}
export default blogApi