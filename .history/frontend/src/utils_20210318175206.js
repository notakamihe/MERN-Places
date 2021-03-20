import axios from 'axios'

export const getImageUrl = (obj) => {
    return `${axios.defaults.baseURL}uploads/${obj.imageUrl ? obj.imageUrl.split('\\')[1] : null}`
}