import axios from "axios"

export const setToken = () => {
    axios.defaults.headers.common['Authentication'] = localStorage.getItem('TOKEN')
}
export const removeToken = () => {
    delete axios.defaults.headers.common['Authentication']
}