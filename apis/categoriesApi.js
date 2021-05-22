import { URL_API } from "../constants"
import axiosClient from "./axiosClient"


export const categoriesApi = {
  getCategories: () => {
    const url = `${URL_API}/category`
    return axiosClient.get(url)
  },
  getCategoriosSlug: (slug) => {
    const url = `${URL_API}/category/${slug}`
    return axiosClient.get(url)
  }
}