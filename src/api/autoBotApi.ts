import axiosClient from './axiosClients'
export default {
  search: (keyword: string) => {
    const url = `/search?format=json&engines=duckduckgo,yahoo,google&lang=id-ID&category_general=1&q=${keyword}`
    return axiosClient.get(url)
  },
}
